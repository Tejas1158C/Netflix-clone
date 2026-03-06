import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { activateSubscription, getProfile } from '../../firebase';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plan, durationMonths } = location.state || {};

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('card');

    // State for different payment methods
    const [cardData, setCardData] = useState({
        email: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    const [upiData, setUpiData] = useState({
        upiId: ''
    });

    const [netBanking, setNetBanking] = useState('');

    const monthlyPriceNum = parseInt((plan?.price || plan?.monthlyPrice || "0").replace(/[^0-9]/g, ''));
    const totalAmount = monthlyPriceNum * (durationMonths || 1);
    const formattedTotal = `₹${totalAmount}`;

    useEffect(() => {
        if (!plan) {
            navigate('/profile');
            return;
        }
        loadUser();
    }, [plan, navigate]);

    const loadUser = async () => {
        const data = await getProfile();
        setUser(data);
        if (data) {
            setCardData(prev => ({ ...prev, email: data.email, name: data.name }));
        }
    };

    const handleInput = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (paymentMethod === 'card' && (!cardData.cardNumber || !cardData.expiry || !cardData.cvc)) {
            toast.error("Please fill in all card details.");
            return;
        }

        if (paymentMethod === 'upi' && !upiData.upiId.includes('@')) {
            toast.error("Please enter a valid UPI ID.");
            return;
        }

        if (paymentMethod === 'netbanking' && !netBanking) {
            toast.error("Please select a bank.");
            return;
        }

        setLoading(true);

        // Simulate Stripe processing delay
        setTimeout(async () => {
            try {
                if (user?.id) {
                    let currentExpiry = user.expiryDate ? new Date(user.expiryDate) : new Date();
                    if (currentExpiry < new Date()) currentExpiry = new Date();

                    const newExpiry = new Date(currentExpiry);
                    newExpiry.setMonth(newExpiry.getMonth() + (durationMonths || 1));

                    await activateSubscription(user.id, {
                        name: plan.name,
                        monthlyPrice: plan.price || plan.monthlyPrice, // Handle both data structures
                        resolution: plan.resolution,
                        expiryDate: newExpiry.toISOString()
                    });

                    toast.success("Payment successful! Your plan has been updated. 🎉");
                    navigate("/profile");
                }
            } catch (err) {
                console.error(err);
                toast.error("Payment failed. Please try again.");
            }
            setLoading(false);
        }, 2500);
    };

    if (!plan) return null;

    return (
        <div className="stripe-checkout-page">
            <div className="checkout-container">
                {/* Left Side: Summary */}
                <div className="checkout-summary">
                    <button className="back-link" onClick={() => navigate(-1)}>&larr; Back</button>
                    <div className="summary-content">
                        <p className="merchant-name">Netflix Clone</p>
                        <div className="product-info">
                            <h1>{plan.name} Plan</h1>
                            <p className="duration-label">Subscription for {durationMonths} month(s)</p>
                        </div>
                        <div className="price-display">
                            <span className="amount">{formattedTotal}</span>
                            <span className="currency-label">INR</span>
                        </div>

                        <div className="summary-details">
                            <div className="summary-row">
                                <span>{plan.name} Plan ({durationMonths} Months)</span>
                                <span>{formattedTotal}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total due today</span>
                                <span>{formattedTotal}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Payment Form */}
                <div className="payment-section">
                    <div className="payment-method-tabs">
                        <button
                            className={paymentMethod === 'card' ? 'active' : ''}
                            onClick={() => setPaymentMethod('card')}
                        >
                            Card
                        </button>
                        <button
                            className={paymentMethod === 'upi' ? 'active' : ''}
                            onClick={() => setPaymentMethod('upi')}
                        >
                            App (UPI)
                        </button>
                        <button
                            className={paymentMethod === 'netbanking' ? 'active' : ''}
                            onClick={() => setPaymentMethod('netbanking')}
                        >
                            Net Banking
                        </button>
                    </div>

                    <form className="stripe-form" onSubmit={handlePayment}>
                        {paymentMethod === 'card' ? (
                            <>
                                <h3>Pay with card</h3>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={cardData.email}
                                        onChange={handleInput}
                                        placeholder="Email address"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Card information</label>
                                    <div className="card-input-wrapper">
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={cardData.cardNumber}
                                            onChange={handleInput}
                                            placeholder="1234 5678 1234 5678"
                                            maxLength="19"
                                            required
                                        />
                                        <div className="card-sub-inputs">
                                            <input
                                                type="text"
                                                name="expiry"
                                                value={cardData.expiry}
                                                onChange={handleInput}
                                                placeholder="MM / YY"
                                                maxLength="5"
                                                required
                                            />
                                            <input
                                                type="text"
                                                name="cvc"
                                                value={cardData.cvc}
                                                onChange={handleInput}
                                                placeholder="CVC"
                                                maxLength="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Name on card</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={cardData.name}
                                        onChange={handleInput}
                                        placeholder="Full name on card"
                                        required
                                    />
                                </div>
                            </>
                        ) : paymentMethod === 'upi' ? (
                            <>
                                <h3>Pay with UPI App</h3>
                                <div className="form-group">
                                    <label>UPI ID</label>
                                    <input
                                        type="text"
                                        placeholder="username@bank"
                                        value={upiData.upiId}
                                        onChange={(e) => setUpiData({ upiId: e.target.value })}
                                        required
                                    />
                                </div>
                                <p className="payment-note">You will receive a request on your UPI app to finalize the payment.</p>
                            </>
                        ) : (
                            <>
                                <h3>Pay with Net Banking</h3>
                                <div className="form-group">
                                    <label>Select your bank</label>
                                    <select
                                        value={netBanking}
                                        onChange={(e) => setNetBanking(e.target.value)}
                                        required
                                    >
                                        <option value="">-- Choose a Bank --</option>
                                        <option value="SBI">State Bank of India</option>
                                        <option value="HDFC">HDFC Bank</option>
                                        <option value="ICICI">ICICI Bank</option>
                                        <option value="AXIS">Axis Bank</option>
                                        <option value="KOTAK">Kotak Mahindra Bank</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="form-group">
                            <label>Country or region</label>
                            <select defaultValue="India">
                                <option value="India">India</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                            </select>
                        </div>

                        <button type="submit" className="stripe-pay-btn" disabled={loading}>
                            {loading ? (
                                <div className="stripe-loader"></div>
                            ) : (
                                `Pay ${formattedTotal}`
                            )}
                        </button>

                        <p className="stripe-footer">
                            Powered by <span>stripe</span> | <a href="#">Terms</a> | <a href="#">Privacy</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
