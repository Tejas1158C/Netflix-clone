/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Onboarding.css';
import { activateSubscription, getProfile } from '../../firebase';
import { toast } from 'react-toastify';

const planData = [
    {
        id: "mobile",
        name: "Mobile",
        resolutionInfo: "480p",
        monthlyPrice: "₹149",
        quality: "Good",
        resolution: "480p",
        devices: "Mobile phone, tablet",
        household: "1",
        download: "1",
        popular: false
    },
    {
        id: "basic",
        name: "Basic",
        resolutionInfo: "720p",
        monthlyPrice: "₹199",
        quality: "Good",
        resolution: "720p (HD)",
        devices: "TV, computer, mobile phone, tablet",
        household: "1",
        download: "1",
        popular: true
    },
    {
        id: "standard",
        name: "Standard",
        resolutionInfo: "1080p",
        monthlyPrice: "₹499",
        quality: "Great",
        resolution: "1080p (Full HD)",
        devices: "TV, computer, mobile phone, tablet",
        household: "2",
        download: "2",
        popular: false
    },
    {
        id: "premium",
        name: "Premium",
        resolutionInfo: "4K + HDR",
        monthlyPrice: "₹649",
        quality: "Best",
        resolution: "4K (Ultra HD) + HDR",
        devices: "TV, computer, mobile phone, tablet",
        household: "4",
        download: "6",
        popular: false
    }
];

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState(planData[1]); // Default to Basic

    // Payment UI State
    const [paymentMethod, setPaymentMethod] = useState(null); // 'card' or 'upi'
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [upiId, setUpiId] = useState("");
    const [paymentLoading, setPaymentLoading] = useState(false);

    const navigate = useNavigate();

    const processPayment = (e) => {
        e.preventDefault();

        // Simple mock validation
        if (paymentMethod === 'card' && (!cardNumber || !expiry || !cvv)) {
            toast.error("Please fill all card details.");
            return;
        }

        if (paymentMethod === 'upi' && !upiId.includes('@')) {
            toast.error("Please enter a valid UPI ID (e.g. name@okhdfc)");
            return;
        }

        // Navigate to Stripe Checkout
        navigate("/checkout", {
            state: {
                plan: selectedPlan,
                durationMonths: 1
            }
        });
    };

    return (
        <div className="onboarding-page">
            {/* Header (Netflix Logo + Sign Out) */}
            <div className={`onboarding-header ${step === 1 ? 'transparent' : 'white'}`}>
                <img src={logo} alt="Netflix Logo" className="logo" />
                <button
                    className={`sign-out-btn ${step === 1 ? 'dark' : 'light'}`}
                    onClick={() => {
                        // Assuming you want them to be able to sign out directly from here
                        import('../../firebase').then(({ logout }) => logout());
                    }}
                >
                    Sign Out
                </button>
            </div>

            {/* Step 1: Splash Screen */}
            {step === 1 && (
                <div className="step-1-splash">
                    <div className="splash-content">
                        <h1>Unlimited movies, shows, and more</h1>
                        <p>Starts at ₹149. Cancel at any time.</p>
                        <button className="finish-signup-btn" onClick={() => setStep(2)}>
                            Finish Sign-Up &gt;
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Choose your plan checklist */}
            {step === 2 && (
                <div className="step-container">
                    <div className="step-content text-center">
                        <div className="step-icon checkmark-circle">✔</div>
                        <span className="step-indicator">Step 2 of 3</span>
                        <h2>Choose your plan</h2>
                        <ul className="checklist">
                            <li><span className="check">✔</span> No commitments, cancel anytime.</li>
                            <li><span className="check">✔</span> Everything on Netflix for one low price.</li>
                            <li><span className="check">✔</span> No ads, no additional fees. Ever.</li>
                        </ul>
                        <button className="next-btn" onClick={() => setStep(3)}>
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Choose the right plan (Table) */}
            {step === 3 && (
                <div className="step-container large">
                    <div className="step-content">
                        <span className="step-indicator">Step 2 of 3</span>
                        <h2>Choose the plan that's right for you</h2>

                        {/* Plan selection grid */}
                        <div className="plans-grid">
                            {planData.map((plan) => (
                                <div
                                    className={`plan-card ${selectedPlan.id === plan.id ? 'selected' : ''}`}
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan)}
                                >
                                    {plan.popular && <div className="popular-tag">Most Popular</div>}
                                    <h3>{plan.name}</h3>
                                    <p>{plan.resolutionInfo}</p>
                                    {selectedPlan.id === plan.id && <span className="selected-check">✔</span>}
                                </div>
                            ))}
                        </div>

                        <div className="plan-details-table">
                            <div className="detail-row">
                                <span>Monthly price</span>
                                <span className="highlight">{selectedPlan.monthlyPrice}</span>
                            </div>
                            <div className="detail-row">
                                <span>Video and sound quality</span>
                                <span className="highlight">{selectedPlan.quality}</span>
                            </div>
                            <div className="detail-row">
                                <span>Resolution</span>
                                <span className="highlight">{selectedPlan.resolution}</span>
                            </div>
                            <div className="detail-row">
                                <span>Supported devices</span>
                                <span className="highlight">{selectedPlan.devices}</span>
                            </div>
                            <div className="detail-row">
                                <span>Devices your household can watch at the same time</span>
                                <span className="highlight">{selectedPlan.household}</span>
                            </div>
                            <div className="detail-row">
                                <span>Download devices</span>
                                <span className="highlight">{selectedPlan.download}</span>
                            </div>
                        </div>

                        <p className="disclaimer">
                            HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities...
                        </p>
                        <button className="next-btn max-w" onClick={() => setStep(4)}>
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Step 4: Choose how to pay OR Payment Forms */}
            {step === 4 && (
                <div className="step-container">
                    <div className="step-content text-center">
                        {!paymentMethod ? (
                            <>
                                <div className="step-icon lock-circle">🔒</div>
                                <span className="step-indicator">Step 3 of 3</span>
                                <h2>Choose how to pay</h2>
                                <p className="pay-desc">Your payment is encrypted and you can change how you pay anytime.</p>
                                <p className="secure-desc"><strong>Secure for peace of mind.<br />Cancel easily online.</strong></p>

                                <div className="payment-options">
                                    <div className="payment-box" onClick={() => setPaymentMethod('card')}>
                                        <span>Credit or Debit Card</span>
                                        <div className="icons">
                                            <span className="visa">VISA</span>
                                            <span className="mc">MC</span>
                                            <span className="arrow">&gt;</span>
                                        </div>
                                    </div>
                                    <div className="payment-box" onClick={() => setPaymentMethod('upi')}>
                                        <span>UPI AutoPay</span>
                                        <div className="icons">
                                            <span className="bhim">BHIM</span>
                                            <span className="paytm">Paytm</span>
                                            <span className="gpay">GPay</span>
                                            <span className="arrow">&gt;</span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="payment-form-wrapper">
                                <button className="back-btn" onClick={() => setPaymentMethod(null)}>&larr; Back to Payment Methods</button>
                                <h2>Set up your {paymentMethod === 'card' ? 'Credit or Debit Card' : 'UPI AutoPay'}</h2>

                                <form onSubmit={processPayment} className="mock-payment-form">
                                    {paymentMethod === 'card' && (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Card Number"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                            />
                                            <div className="split-inputs">
                                                <input
                                                    type="text"
                                                    placeholder="Expiry (MM/YY)"
                                                    value={expiry}
                                                    onChange={(e) => setExpiry(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="CVV"
                                                    value={cvv}
                                                    onChange={(e) => setCvv(e.target.value)}
                                                />
                                            </div>
                                            <input type="text" placeholder="Name on Card" />
                                        </>
                                    )}

                                    {paymentMethod === 'upi' && (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Enter UPI ID (e.g. name@okhdfc)"
                                                value={upiId}
                                                onChange={(e) => setUpiId(e.target.value)}
                                            />
                                            <p className="upi-help">A payment request will be sent to your UPI app.</p>
                                        </>
                                    )}

                                    <div className="summary-box">
                                        <p><strong>{selectedPlan.monthlyPrice}/month</strong></p>
                                        <p>{selectedPlan.name} Plan</p>
                                    </div>

                                    <button type="submit" className="next-btn pay-now-btn" disabled={paymentLoading}>
                                        {paymentLoading ? 'Processing...' : 'Pay Now'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Onboarding;
