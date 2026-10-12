// Membership Section for NEXUS PLAY
// Showcases Free Explorer (₹0), Nexus Plus (₹299/mo), and Nexus Ultimate (₹599/mo)
// Includes explicit disclaimers and interactive demo tier switcher

import React, { useState } from 'react';
import { Crown, Check, ShieldAlert, Sparkles, Zap, Info, ArrowRight } from 'lucide-react';
import { MEMBERSHIP_PLANS, MEMBERSHIP_DISCLAIMER } from '../../data/membershipData';

export default function MembershipSection({ currentTier = 'free', onSelectTier }) {
  const [selectedPlanModal, setSelectedPlanModal] = useState(null);

  const handlePlanClick = (plan) => {
    setSelectedPlanModal(plan);
  };

  const handleConfirmSimulatedTier = (planId) => {
    if (onSelectTier) onSelectTier(planId);
    setSelectedPlanModal(null);
  };

  return (
    <section className="nexus-membership-section" id="membership">
      {/* Header */}
      <div className="section-header-block text-center max-w-3xl mx-auto mb-10">
        <div className="section-eyebrow inline-flex items-center gap-2">
          <Crown size={16} className="text-violet" />
          <span>MEMBERSHIP & SUBSCRIPTION CONCEPTS</span>
        </div>
        <h2 className="section-title text-4xl mt-2 mb-3">
          Choose Your <span className="gradient-text-hero">Gaming Horizon</span>
        </h2>
        <p className="section-subtitle text-lg">
          Flexible illustrative plans designed for casual instant players and ambitious cloud gamers alike.
        </p>
      </div>

      {/* Prominent Disclaimer Notice */}
      <div className="membership-transparency-card">
        <ShieldAlert size={24} className="text-cyan shrink-0" />
        <div className="transparency-copy">
          <strong>{MEMBERSHIP_DISCLAIMER.title}</strong>
          <p>{MEMBERSHIP_DISCLAIMER.notice}</p>
        </div>
      </div>

      {/* Plans Pricing Grid */}
      <div className="membership-plans-grid">
        {MEMBERSHIP_PLANS.map((plan) => {
          const isCurrentActive = currentTier === plan.id;

          return (
            <div
              key={plan.id}
              className={`membership-card ${plan.highlight ? 'plan-highlight' : ''} ${
                isCurrentActive ? 'plan-active' : ''
              }`}
            >
              {plan.highlight && (
                <div className="plan-badge-pill">
                  <Sparkles size={13} /> {plan.badge}
                </div>
              )}

              <div className="plan-card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="plan-price-block">
                  <span className="plan-price-amount">{plan.price}</span>
                  <span className="plan-billing-cycle">/{plan.billingPeriod}</span>
                </div>
                <p className="plan-desc">{plan.description}</p>
              </div>

              <div className="plan-divider" />

              <div className="plan-perks-box">
                <span className="perks-label">Included Features:</span>
                <ul className="plan-perks-list">
                  {plan.perks.map((perk, idx) => (
                    <li key={idx} className="perk-item">
                      <Check size={16} className="text-cyan shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="plan-card-footer">
                {isCurrentActive ? (
                  <button type="button" className="btn-plan-active" disabled>
                    ✓ Current Simulated Tier
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`btn-plan-select ${plan.highlight ? 'glow-violet' : ''}`}
                    onClick={() => handlePlanClick(plan)}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight size={16} />
                  </button>
                )}
                <small className="plan-footnote">Demo Mode • No Payment Processed</small>
              </div>
            </div>
          );
        })}
      </div>

      {/* Informative Plan Modal */}
      {selectedPlanModal && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedPlanModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedPlanModal.name} Plan Details`}
        >
          <div className="plan-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="plan-modal-header">
              <div>
                <span className="modal-eyebrow">Simulate Membership Tier</span>
                <h3 className="modal-plan-title">{selectedPlanModal.name}</h3>
                <span className="modal-price-tag">
                  {selectedPlanModal.price} ({selectedPlanModal.billingPeriod})
                </span>
              </div>
              <button
                type="button"
                className="icon-circle-btn close-btn"
                onClick={() => setSelectedPlanModal(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="plan-modal-body">
              <div className="plan-modal-notice">
                <Info size={20} className="text-violet shrink-0" />
                <div>
                  <strong>No Money Charged • Frontend Simulation</strong>
                  <p>
                    Activating this tier updates your local demo profile status on this browser. In a commercial platform, this requires secure payment processing, user registration, and entitlement verification services.
                  </p>
                </div>
              </div>

              <div className="modal-perks-summary">
                <h4>What this simulated tier provides:</h4>
                <ul>
                  {selectedPlanModal.perks.map((p, i) => (
                    <li key={i}>
                      <Check size={15} className="text-cyan shrink-0 mr-2" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="plan-modal-footer">
              <button
                type="button"
                className="btn-secondary-gaming"
                onClick={() => setSelectedPlanModal(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary-gaming glow-effect"
                onClick={() => handleConfirmSimulatedTier(selectedPlanModal.id)}
              >
                Set as Active Demo Tier
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
