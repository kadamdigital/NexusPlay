// Demo Purchase Modal: Simulates access entitlement dialog for premium cloud games
// Transparent, strictly non-commercial dialog explaining architecture requirements and no real payments

import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, CheckCircle2, Lock, Info } from 'lucide-react';

export default function DemoPurchaseModal({ game, onClose, onSimulateAccess }) {
  const [simulatedAccessGranted, setSimulatedAccessGranted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!game) return null;

  const handleSimulate = () => {
    setSimulatedAccessGranted(true);
    if (onSimulateAccess) {
      onSimulateAccess(game.id);
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Demo Access Entitlement"
    >
      <div className="demo-purchase-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="purchase-modal-header">
          <div className="flex items-center gap-3">
            <div className="lock-icon-badge">
              <Lock size={18} className="text-violet" />
            </div>
            <div>
              <h2 className="purchase-modal-title">Demo Access Entitlement</h2>
              <span className="purchase-modal-sub">{game.title} • Premium Concept Title</span>
            </div>
          </div>

          <button
            type="button"
            className="icon-circle-btn close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="purchase-modal-body">
          {/* Explicit No Payment Banner */}
          <div className="payment-notice-banner">
            <ShieldAlert size={22} className="text-cyan shrink-0" />
            <div>
              <strong>Portfolio Demonstration Only — Zero Financial Transactions</strong>
              <p>
                No real payments, cards, or banking information are ever requested or charged. All prices (e.g., {game.demoPrice}) are illustrative sample models designed for the Kadam Digital product showcase.
              </p>
            </div>
          </div>

          {/* Game summary preview */}
          <div className="purchase-game-summary">
            <div className="flex-1">
              <h3 className="summary-game-name">{game.title}</h3>
              <p className="summary-game-desc">{game.summary}</p>
              <div className="summary-tags">
                <span className="tag-pill">{game.genre}</span>
                <span className="tag-pill">Cloud Streaming Concept</span>
              </div>
            </div>
            <div className="summary-price-box">
              <span className="sample-label">Sample Access Fee</span>
              <span className="sample-price">{game.demoPrice}</span>
              <span className="sample-note">(Simulated Demo)</span>
            </div>
          </div>

          {/* Technical Architecture Disclosure */}
          <div className="arch-explanation-card">
            <div className="arch-header">
              <Info size={16} className="text-violet" />
              <span>Production Integration Requirements</span>
            </div>
            <ul className="arch-list">
              <li>
                <strong>Payment Gateway:</strong> Integration with Stripe / Razorpay Webhooks.
              </li>
              <li>
                <strong>Entitlement Service:</strong> User JWT session & cryptographic license signing.
              </li>
              <li>
                <strong>Cloud Edge Streaming:</strong> GPU server orchestration (NVIDIA RTX / AMD Cloud instances).
              </li>
            </ul>
          </div>

          {/* Simulated Access Result */}
          {simulatedAccessGranted ? (
            <div className="simulated-success-box">
              <CheckCircle2 size={24} className="text-emerald" />
              <div>
                <strong>Simulated Access Unlocked!</strong>
                <p>
                  You have toggled local demo access for <em>{game.title}</em>. Since remote game streaming hardware is not active in this frontend demo, cloud streaming remains simulated.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div className="purchase-modal-footer">
          <button type="button" className="btn-secondary-gaming" onClick={onClose}>
            Close
          </button>

          {!simulatedAccessGranted ? (
            <button
              type="button"
              className="btn-primary-gaming glow-effect"
              onClick={handleSimulate}
            >
              Simulate Demo Access (Free Demo Mode)
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary-gaming glow-effect"
              onClick={onClose}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
