import React from "react";
import "../styles/ValuePartnership.css";
import { FiSearch, FiAward, FiBarChart } from "react-icons/fi";


const ValuePartnership = () => {
    return (
        <div className="value-container">
            {/* Middle Hexagon */}
            <div className="hexagon middle">
                <h2 className="title">Value-driven partnership model</h2>
                <p className="subtitle">We do the work, you reap the rewards.</p>
            </div>

            {/* Left Hexagon */}
            <div className="hexagon left">
                <FiSearch className="Valueicon" />
                <h3>Deep-dive analysis</h3>
            </div>
            <div className="text left-text">
                <p>Analyze closed and written-off deductions, unpaid and written-off invoices, and under-billed invoices.</p>
                <p>We have a team of 3,000+ deduction specialists and a global network of auditors.</p>
                <p>Use advanced digital tools for faster processing and deeper insights.</p>
            </div>

            {/* Bottom Hexagon */}

            <div className="hexagon bottom">
                <FiAward className="Valueicon" />
                <h3>Shared success</h3>
            </div>

            {/* Right Hexagon */}
            <div className="hexagon right">
                <FiBarChart className="Valueicon" />
                <h3>Maximized recovery</h3>
            </div>

            <div className="hexagon border right-border">
                <div className="inside">

                </div>
            </div>
            <div className="hexagon border left-border">
                <div className="inside">

                </div>
            </div>
            <div className="hexagon border bottom-border">
                <div className="inside">

                </div>
            </div>
            <div className="text right-text">
                <p>Post-audit and recovery: We identify and reclaim valid claims from invalid deductions.</p>

                 <p>   Best practices implementation: We partner with you to minimize future deductions.</p>

                   <p> Digital acceleration: Leverage Al and automation for efficient, maximized recovery.</p>
            </div>
            <div className="text bottom-text">
                <p>Value share model: You only pay a percentage of recovered funds.</p>

                 <p>No upfront investment: We invest our resources. You get all the benefit</p>
            </div>
        </div>
    );
};

export default ValuePartnership;
