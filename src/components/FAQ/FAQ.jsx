import React, { useState } from 'react';
import './FAQ.css';

const faqData = [
    {
        question: "What is Netflix?",
        answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!"
    },
    {
        question: "How much does Netflix cost?",
        answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts."
    },
    {
        question: "Where can I watch?",
        answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles."
    },
    {
        question: "How do I cancel?",
        answer: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    },
    {
        question: "What can I watch on Netflix?",
        answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
    },
    {
        question: "Is Netflix good for kids?",
        answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see."
    }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className='faq-container'>
            <h2 className='faq-title'>Frequently Asked Questions</h2>

            <div className='faq-list'>
                {faqData.map((item, index) => (
                    <div className='faq-item' key={index}>
                        <button className='faq-question' onClick={() => toggleAccordion(index)}>
                            <span>{item.question}</span>
                            <span className={`faq-icon ${activeIndex === index ? 'rotate' : ''}`}>+</span>
                        </button>
                        <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="email-form-section">
                <p>Ready to watch? Enter your email to create or restart your membership.</p>
                <div className="email-form">
                    <input type="email" placeholder="Email address" />
                    <button type="button" className="get-started-btn">
                        Get Started &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
