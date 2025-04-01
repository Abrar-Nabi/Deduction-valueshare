import React, { useEffect } from "react";
import "../styles/AdditionalBenefits.css";
import { FaMoneyBillWave, FaCog, FaChartLine, FaFileAlt, FaHandshake } from "react-icons/fa";

const AdditionalBenefits = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate"); // Add animation class
                        entry.target.classList.remove("reset");
                    } else {
                        entry.target.classList.remove("animate"); // Remove animation when out of view
                        entry.target.classList.add("reset");
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 20% of the item is visible
        );

        const items = document.querySelectorAll(".benefit-item");
        items.forEach((item) => observer.observe(item));

        return () => observer.disconnect(); // Cleanup observer on unmount
    }, []);

    return (
        <div className="benefits-section">
            <h2 className="benefits-title">
                <span className="highlight">Additional</span> benefits
            </h2>

            <div className="benefits-grid">
                {/* Benefit 1 - Odd (from left) */}
                <div className="benefit-item benefit-odd">
                    <div className="benefit-hexagon-container">
                        <div className="benefit-hexagon">
                            <FaMoneyBillWave className="benefit-icon" />
                        </div>
                    </div>
                    <h3 className="benefit-heading">Improved cash flow</h3>
                    <p className="benefit-text">Access working capital tied up in unresolved deductions.</p>
                </div>

                {/* Benefit 2 - Even (from right) */}
                <div className="benefit-item benefit-even">
                    <div className="benefit-hexagon-container">
                        <div className="benefit-hexagon">
                            <FaCog className="benefit-icon" />
                        </div>
                    </div>
                    <h3 className="benefit-heading">Enhanced efficiency</h3>
                    <p className="benefit-text">Streamline processes with automation.</p>
                </div>

                {/* Benefit 3 - Odd (from left) */}
                <div className="benefit-item benefit-odd">
                    <div className="benefit-hexagon-container">
                        <div className="benefit-hexagon">
                            <FaChartLine className="benefit-icon" />
                        </div>
                    </div>
                    <h3 className="benefit-heading">Data-driven decisions</h3>
                    <p className="benefit-text">Gain insights for proactive deduction management.</p>
                </div>

                {/* Benefit 4 - Even (from right) */}
                <div className="benefit-item benefit-even">
                    <div className="benefit-hexagon-container">
                        <div className="benefit-hexagon">
                            <FaFileAlt className="benefit-icon" />
                        </div>
                    </div>
                    <h3 className="benefit-heading">Transparency and control</h3>
                    <p className="benefit-text">Real-time reporting and insights.</p>
                </div>

                {/* Benefit 5 - Odd (from left) */}
                <div className="benefit-item benefit-odd">
                    <div className="benefit-hexagon-container">
                        <div className="benefit-hexagon">
                            <FaHandshake className="benefit-icon" />
                        </div>
                    </div>
                    <h3 className="benefit-heading">Better negotiation capabilities</h3>
                    <p className="benefit-text">Strengthen vendor relationships and contract terms.</p>
                </div>
            </div>
        </div>
    );
};

export default AdditionalBenefits;
