import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDialog } from '../context/DialogContext';
import { supabase } from '../lib/supabase';
import { 
  FiStar, 
  FiCheck, 
  FiZap, 
  FiAward, 
  FiShield, 
  FiTrendingUp, 
  FiBookOpen, 
  FiActivity,
  FiCheckCircle,
  FiArrowRight,
  FiInfo,
  FiCreditCard,
  FiLock,
  FiX,
  FiGift
} from 'react-icons/fi';
import './Premium.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Premium() {
  const { user, isPro, upgradeToPro, profile } = useAuth();
  const { showAlert, showConfirm } = useDialog();
  const [upgrading, setUpgrading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('monthly'); // 'monthly' | 'annual'
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchParams] = useSearchParams();
  const [showCashModal, setShowCashModal] = useState(false);
  const [cashRequested, setCashRequested] = useState(false);
  const [cashLoading, setCashLoading] = useState(false);


  // Click Payment Flow States
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showCertNotification, setShowCertNotification] = useState(false);
  const plans = {
    monthly: {
      id: 'monthly',
      name: 'Oylik Obuna',
      price: '29 000 UZS',
      period: 'oy',
      savings: null,
      popular: false,
      tagline: 'Moslashuvchan reja, har oy to\'lov'
    },
    annual: {
      id: 'annual',
      name: 'Yillik Obuna',
      price: '199 000 UZS',
      period: 'yil',
      savings: 'Oylikka qaraganda 42% tejash',
      popular: true,
      tagline: 'Eng yaxshi qiymat, to\'liq kirish'
    }
  };

  // Card formatting: inserts spaces every 4 digits
  const handleCardNumberChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, ''); // keep only digits
    const limitedVal = rawVal.substring(0, 16); // max 16 digits
    const formatted = limitedVal.replace(/(\d{4})(?=\d)/g, '$1 '); // add spaces
    setCardNumber(formatted);
    
    // Clear error
    if (formErrors.cardNumber) {
      setFormErrors(prev => ({ ...prev, cardNumber: null }));
    }
  };

  // Card Expiry formatting: inserts '/' after MM and auto-prepends leading zero
  const handleExpiryChange = (e) => {
    let val = e.target.value;
    
    // If the user deleted the slash, let them backspace cleanly
    if (cardExpiry.endsWith('/') && !val.includes('/')) {
      setCardExpiry(val.substring(0, 1));
      return;
    }
    
    let clean = val.replace(/\D/g, '');
    
    // Auto-prepend 0 for months starting with 2-9
    if (clean.length === 1 && clean !== '0' && clean !== '1') {
      clean = '0' + clean;
    }
    
    let formatted = clean.substring(0, 4);
    if (clean.length > 2) {
      formatted = `${clean.substring(0, 2)}/${clean.substring(2, 4)}`;
    } else if (clean.length === 2) {
      formatted = clean;
      if (!cardExpiry.includes('/')) {
        formatted += '/';
      }
    }
    
    setCardExpiry(formatted);

    // Clear error
    if (formErrors.cardExpiry) {
      setFormErrors(prev => ({ ...prev, cardExpiry: null }));
    }
  };

  // CVV change handler
  const handleCvvChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, ''); // keep only digits
    setCardCvv(rawVal.substring(0, 3)); // max 3 digits

    // Clear error
    if (formErrors.cardCvv) {
      setFormErrors(prev => ({ ...prev, cardCvv: null }));
    }
  };

  // Detect card type based on prefix
  const getCardType = (num) => {
    const cleanNum = num.replace(/\D/g, '');
    if (cleanNum.startsWith('8600')) return 'uzcard';
    if (cleanNum.startsWith('9860')) return 'humo';
    if (cleanNum.startsWith('4')) return 'visa';
    if (cleanNum.startsWith('5')) return 'mastercard';
    return 'generic';
  };

  const startPaymentFlow = () => {
    // Reset payment wizard
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setPromoCode('');
    setPromoApplied(false);
    setAppliedDiscountPercent(0);
    setFormErrors({});
    setShowPaymentModal(true);
  };

  useEffect(() => {
    const triggerCheckout = searchParams.get('checkout');
    const planParam = searchParams.get('plan');

    if (triggerCheckout === 'true' && !isPro) {
      if (planParam === 'monthly' || planParam === 'annual') {
        setSelectedPlan(planParam);
      }
      startPaymentFlow();
    }
  }, [searchParams, isPro]);

  const handleApplyPromo = () => {
    const code = promoCode.trim();
    if (!code) {
      setFormErrors(prev => ({ ...prev, promo: "Promokodni kiriting." }));
      return;
    }
    
    // Retrieve promo codes from localStorage
    const savedPromos = JSON.parse(localStorage.getItem('biosmart_promocodes') || '[]');
    let list = savedPromos;
    if (list.length === 0) {
      // Seed default if empty
      list = [
        { code: 'BIOSMART', discount: 30 },
        { code: 'PRO50', discount: 50 },
        { code: 'FREE100', discount: 100 }
      ];
    }
    
    const foundPromo = list.find(p => p.code === code);
    if (!foundPromo) {
      setFormErrors(prev => ({ ...prev, promo: "Bunday promokod mavjud emas." }));
      setPromoApplied(false);
      setAppliedDiscountPercent(0);
      return;
    }
    
    setPromoApplied(true);
    setAppliedDiscountPercent(foundPromo.discount);
    setFormErrors(prev => ({ ...prev, promo: null }));
  };

  const validateCardStep = () => {
    const errors = {};
    const cleanCard = cardNumber.replace(/\D/g, '');
    
    if (cleanCard.length !== 16) {
      errors.cardNumber = "Karta raqami 16 ta raqamdan iborat bo'lishi kerak.";
    }

    if (cardExpiry.length !== 5) {
      errors.cardExpiry = "Yaroqlilik muddati MM/YY formatida bo'lishi lozim.";
    } else {
      const [m] = cardExpiry.split('/').map(Number);
      if (m < 1 || m > 12) {
        errors.cardExpiry = "Noto'g'ri oy kiritildi.";
      }
    }

    const cardType = getCardType(cardNumber);
    const isCvvRequired = cardType !== 'uzcard' && cardType !== 'humo';
    
    if (isCvvRequired && cardCvv.length !== 3) {
      errors.cardCvv = "CVV kod 3 ta raqamdan iborat bo'lishi kerak.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getCalculatedPrice = () => {
    const basePrice = selectedPlan === 'monthly' ? 29000 : 199000;
    if (!promoApplied) {
      return {
        base: basePrice,
        discount: 0,
        percent: 0,
        total: basePrice,
        baseFormatted: basePrice.toLocaleString('uz-UZ') + ' UZS',
        totalFormatted: basePrice.toLocaleString('uz-UZ') + ' UZS'
      };
    }
    
    const discountPercent = appliedDiscountPercent;
    const discountAmount = Math.round((basePrice * discountPercent) / 100);
    const total = basePrice - discountAmount;
    
    return {
      base: basePrice,
      discount: discountAmount,
      percent: discountPercent,
      total: total,
      baseFormatted: basePrice.toLocaleString('uz-UZ') + ' UZS',
      discountFormatted: discountAmount.toLocaleString('uz-UZ') + ' UZS',
      totalFormatted: total.toLocaleString('uz-UZ') + ' UZS'
    };
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    if (!validateCardStep()) return;

    setProcessing(true);
    // Simulate direct bank transaction clearing
    setTimeout(async () => {
      try {
        await upgradeToPro(true, selectedPlan);

        // Insert a new mock certificate into localStorage for absolute premium detail!
        try {
          const certs = JSON.parse(localStorage.getItem('biosmart_certificates') || '[]');
          const hasProCert = certs.some(c => c.is_pro_cert === true && c.user_id === (user?.id || 'guest'));
          if (!hasProCert) {
            certs.push({
              id: Math.floor(Math.random() * 1000000) + 1,
              user_id: user?.id || 'guest',
              topic_id: 101, // 5th grade Topic 1 as anchor
              score: 100,
              earned_at: new Date().toISOString(),
              is_pro_cert: true // Custom flag
            });
            localStorage.setItem('biosmart_certificates', JSON.stringify(certs));
          }
        } catch (e) {
          console.warn("Mock cert insert failed:", e);
        }

        setProcessing(false);
        setShowPaymentModal(false);
        setShowSuccessModal(true);

        // Trigger the large "Yangi Sertifikat" notification from the top after 1.2 seconds!
        setTimeout(() => {
          setShowCertNotification(true);
        }, 1200);
      } catch (err) {
        console.error("Payment transaction failed:", err);
        setProcessing(false);
        setFormErrors({ cardNumber: "Tranzaksiya bajarilishida xatolik yuz berdi. Qaytadan urinib ko'ring." });
      }
    }, 2000);
  };

  const handleCashRequest = async () => {
    setCashLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const token = session?.data?.session?.access_token;

      const res = await fetch(`${API_URL}/api/subscriptions/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ planType: selectedPlan })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Xatolik yuz berdi');
      }

      setCashRequested(true);
    } catch (err) {
      await showAlert(err.message || 'Serverga ulanishda xatolik', {
        title: 'Xatolik',
        variant: 'danger'
      });
    } finally {
      setCashLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    const confirmCancel = await showConfirm(
      "Haqiqatan ham BioSmart PRO obunasini bekor qilmoqchimisiz? Premium sinf kitoblari va aralash testlar bo'limi bloklanadi.",
      {
        title: "Obunani bekor qilish",
        variant: "danger",
        confirmText: "Ha, bekor qilinsin",
        cancelText: "Yo'q, qolsin"
      }
    );
    if (confirmCancel) {
      setUpgrading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        await upgradeToPro(false);
        await showAlert("Obuna muvaffaqiyatli bekor qilindi. Bepul tarifga qaytdingiz.", {
          title: "Muvaffaqiyatli",
          variant: "success"
        });
      } catch (e) {
        console.error("Subscription cancellation failed:", e);
        await showAlert("Xatolik yuz berdi.", {
          title: "Xatolik",
          variant: "danger"
        });
      } finally {
        setUpgrading(false);
      }
    }
  };

  return (
    <div className="premium-page">
      {/* Dynamic Top Floating "Yangi Sertifikat" Notification */}
      {showCertNotification && (
        <div className="cert-toast-notification animate-slide-down">
          <div className="cert-toast-glow"></div>
          <div className="cert-toast-content">
            <div className="cert-toast-icon-wrapper">
              <FiAward className="cert-toast-trophy-icon animate-pulse-slow" />
            </div>
            <div className="cert-toast-text-column">
              <div className="cert-toast-badge">MUKOFOT TOPSHIRILDI</div>
              <h4>🏆 Yangi Sertifikat!</h4>
              <p className="cert-toast-title-primary">
                BioSmart PRO Oltin Sertifikati
              </p>
              <div className="cert-toast-reason-box">
                <span className="reason-label">BERILGANLIK SABABI:</span>
                <p className="reason-text">
                  BioSmart platformasida PRO premium tarifi muvaffaqiyatli faollashtirildi. 
                  Endi sizda barcha 5-11 sinf darsliklari, cheksiz DTM mock imtihonlari va xatolar ustida ishlash bo'limi to'liq ochiq!
                </p>
              </div>
              <div className="cert-toast-actions-row">
                <Link to="/analytics?view_cert=pro" className="cert-toast-action-btn" onClick={() => setShowCertNotification(false)}>
                  Sertifikatni Ko'rish va Yuklash 📥
                </Link>
              </div>
            </div>
            <button className="cert-toast-close-btn" onClick={() => setShowCertNotification(false)} title="Yopish">
              <FiX />
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="premium-modal-overlay">
          <div className="premium-success-card animate-scale-up">
            <div className="success-icon-wrapper">
              <FiCheckCircle className="success-checkmark" />
            </div>
            <h2>BioSmart PRO-ga xush kelibsiz! 🎉</h2>
            <p className="success-welcome-msg">
              Hurmatli <strong>{profile?.full_name || 'Foydalanuvchi'}</strong>, sizning premium obunangiz muvaffaqiyatli faollashtirildi! 
              Endi barcha o'quv materiallari, darsliklar, tahlillar va sertifikatlar siz uchun to'liq ochiq.
            </p>
            <div className="success-badge-row">
              <span className="premium-badge-gold">👑 PRO PLAN FAOL</span>
            </div>
            <button 
              className="success-dismiss-btn" 
              onClick={() => setShowSuccessModal(false)}
            >
              Qani, boshladik! <FiArrowRight />
            </button>
          </div>
        </div>
      )}

      {/* Cash Payment Modal */}
      {showCashModal && (
        <div className="premium-modal-overlay">
          <div className="click-checkout-card animate-scale-up">
            <div className="click-modal-header">
              <h2 style={{ color: '#fff', fontSize: '22px' }}>💵 Naqd pul to'lovi</h2>
              <button className="click-close-btn" onClick={() => setShowCashModal(false)}>
                <FiX />
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              {cashRequested ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                  <h3 style={{ color: '#fff', marginBottom: '12px' }}>So'rovingiz yuborildi!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>
                    Sizning naqd pul to'lov so'rovingiz administratorga yuborildi.
                    Administrator to'lovni tasdiqlagach, obunangiz faollashtiriladi.
                  </p>
                  <p style={{ color: '#fbbf24', fontSize: '14px' }}>
                    ⏳ Iltimos, administrator javobini kuting
                  </p>
                  <button
                    className="checkout-btn checkout-btn--purchase"
                    onClick={() => { setShowCashModal(false); setCashRequested(false); }}
                    style={{ marginTop: '20px' }}
                  >
                    Tushunarli
                  </button>
                </div>
              ) : (
                <>
                  <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                    <h4 style={{ color: '#fbbf24', marginBottom: '8px' }}>📋 To'lov ma'lumotlari</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>Obuna turi:</span>
                      <span style={{ color: '#fff', fontWeight: 'bold' }}>{selectedPlan === 'monthly' ? 'Oylik' : 'Yillik'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                      <span style={{ color: 'rgba(255,255,255,0.7)' }}>To'lov miqdori:</span>
                      <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '18px' }}>{plans[selectedPlan].price}</span>
                    </div>
                  </div>
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
                    <p style={{ color: '#fca5a5', fontSize: '14px', lineHeight: '1.6' }}>
                      <strong>📌 Diqqat!</strong> Naqd pul to'lovida avval so'rov yuboriladi va administrator 
                      tomonidan tasdiqlanadi. Tasdiqlangach obunangiz faollashtiriladi.
                      Administrator bilan bog'lanib to'lovni amalga oshiring.
                    </p>
                  </div>
                  <button
                    className="checkout-btn checkout-btn--purchase"
                    onClick={handleCashRequest}
                    disabled={cashLoading}
                    style={{ width: '100%' }}
                  >
                    {cashLoading ? "Yuborilmoqda..." : `Naqd pul so'rovini yuborish`}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click Branded Checkout Modal Dialog */}
      {showPaymentModal && (
        <div className="premium-modal-overlay click-theme-backdrop">
          <div className="click-checkout-card animate-scale-up">
            
            {/* Modal Header */}
            <div className="click-modal-header">
              <ClickLogoSVG />
              <button className="click-close-btn" onClick={() => setShowPaymentModal(false)}>
                <FiX />
              </button>
            </div>

            {/* Direct Card Input form */}
            <form onSubmit={handleCardSubmit} className="click-card-form">
              
              {/* Test Mode Banner */}
              <div className="click-test-alert">
                <div className="test-alert-content">
                  <strong>💡 TEST REJIMI:</strong>
                  <span> Sinab ko'rish uchun ixtiyoriy 16 xonali karta raqami kiriting. Uzcard (8600...) yoki Humo (9860...) yozilganda, CVV kod maydoni avtomatik yashiriladi va talab etilmaydi! Visa (4...) kabi kartalar kiritilganda esa CVV (masalan, 123) talab qilinadi.</span>
                </div>
              </div>

              {/* Virtual Card Preview Widget */}
              <div className="virtual-card-widget">
                <div className="v-card-wave-bg"></div>
                <div className="v-card-top-row">
                  <span className="v-card-chip"></span>
                  <span className="v-card-type">
                    {getCardType(cardNumber) === 'uzcard' && <UzcardLogoSVG />}
                    {getCardType(cardNumber) === 'humo' && <HumoLogoSVG />}
                    {getCardType(cardNumber) === 'visa' && <VisaLogoSVG />}
                    {getCardType(cardNumber) === 'generic' && <FiCreditCard size={32} style={{ color: 'rgba(255,255,255,0.7)' }} />}
                  </span>
                </div>
                <div className="v-card-number">
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="v-card-bottom-row">
                  <div className="v-card-holder">
                    <span>KARTA EGLASI</span>
                    <strong>{profile?.full_name ? profile.full_name.toUpperCase() : 'BIOSMART USER'}</strong>
                  </div>
                  <div className="v-card-expiry">
                    <span>MUDDATI</span>
                    <strong>{cardExpiry || 'MM/YY'}</strong>
                  </div>
                </div>
              </div>

              {/* Form fields */}
              <div className="click-form-group">
                <label className="click-input-label">Karta raqami</label>
                <div className="click-input-wrapper">
                  <FiCreditCard className="click-field-icon" />
                  <input 
                    type="text"
                    className={`click-input-field ${formErrors.cardNumber ? 'field-error' : ''}`}
                    placeholder="8600 0000 0000 0000"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                  <div className="card-brand-indicator">
                    {getCardType(cardNumber) === 'uzcard' && <span className="uzcard-badge">Uzcard</span>}
                    {getCardType(cardNumber) === 'humo' && <span className="humo-badge">Humo</span>}
                  </div>
                </div>
                {formErrors.cardNumber && <span className="click-error-msg">{formErrors.cardNumber}</span>}
              </div>

              <div className={`click-form-row ${getCardType(cardNumber) === 'uzcard' || getCardType(cardNumber) === 'humo' ? 'click-form-row--single' : ''}`}>
                <div className="click-form-group">
                  <label className="click-input-label">Muddati (Oy/Yil)</label>
                  <div className="click-input-wrapper">
                    <FiLock className="click-field-icon" />
                    <input 
                      type="text"
                      className={`click-input-field ${formErrors.cardExpiry ? 'field-error' : ''}`}
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                    />
                  </div>
                  {formErrors.cardExpiry && <span className="click-error-msg">{formErrors.cardExpiry}</span>}
                </div>

                {getCardType(cardNumber) !== 'uzcard' && getCardType(cardNumber) !== 'humo' && (
                  <div className="click-form-group">
                    <label className="click-input-label">CVV / CVC kod</label>
                    <div className="click-input-wrapper">
                      <FiLock className="click-field-icon" />
                      <input 
                        type="password"
                        className={`click-input-field ${formErrors.cardCvv ? 'field-error' : ''}`}
                        placeholder="***"
                        value={cardCvv}
                        onChange={handleCvvChange}
                        maxLength="3"
                      />
                    </div>
                    {formErrors.cardCvv && <span className="click-error-msg">{formErrors.cardCvv}</span>}
                  </div>
                )}
              </div>

              {/* Promo Code Section */}
              <div className="click-promo-section">
                <label className="click-input-label">Promokod (ixtiyoriy)</label>
                <div className="click-promo-row">
                  <div className="click-input-wrapper click-promo-input-wrap">
                    <FiGift className="click-field-icon" />
                    <input
                      type="text"
                      className={`click-input-field ${formErrors.promo ? 'field-error' : ''}`}
                      placeholder="Promokodni kiriting..."
                      value={promoCode}
                      onChange={(e) => {
                        setPromoCode(e.target.value);
                        if (promoApplied) setPromoApplied(false);
                        if (formErrors.promo) setFormErrors(prev => ({ ...prev, promo: null }));
                      }}
                      disabled={promoApplied}
                    />
                  </div>
                  <button
                    type="button"
                    className={`click-promo-apply-btn ${promoApplied ? 'applied' : ''}`}
                    onClick={handleApplyPromo}
                    disabled={promoApplied}
                  >
                    {promoApplied ? '✓ Qo\'llandi' : 'Qo\'llash'}
                  </button>
                </div>
                {formErrors.promo && <span className="click-error-msg">{formErrors.promo}</span>}
                {promoApplied && (
                  <span className="click-promo-success">🎉 Promokod muvaffaqiyatli qo'llandi!</span>
                )}
              </div>

              <div className="click-summary-box">
                {promoApplied ? (
                  <div className="click-summary-detailed">
                    <div className="click-summary-row-item">
                      <span>Asl narxi:</span>
                      <span>{getCalculatedPrice().baseFormatted}</span>
                    </div>
                    <div className="click-summary-row-item click-discount-highlight">
                      <span>Chegirma ({getCalculatedPrice().percent}%):</span>
                      <span>-{getCalculatedPrice().discountFormatted}</span>
                    </div>
                    <div className="click-summary-divider"></div>
                    <div className="click-summary-row-item click-total-row">
                      <span>Jami to'lov:</span>
                      <strong>{getCalculatedPrice().totalFormatted}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="click-summary-simple">
                    <span>To'lov miqdori:</span>
                    <strong>{getCalculatedPrice().totalFormatted}</strong>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="click-action-btn"
                disabled={processing}
              >
                {processing ? (
                  <span className="spinner-loader-row">
                    <span className="mini-spinner"></span>
                    Tranzaksiya bajarilmoqda...
                  </span>
                ) : (
                  `To'lovni amalga oshirish (${getCalculatedPrice().totalFormatted}) ⚡`
                )}
              </button>
            </form>

          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="premium-hero">
        <div className="premium-hero__badge">
          <FiStar className="spin-star" />
          <span>BIOSMART PREMIUM</span>
        </div>
        <h1>Biologiyani Yuqori Sifatda O'rganing</h1>
        <p className="premium-hero__desc">
          BioSmart PRO yordamida standart cheklovlardan xalos bo'ling. 
          Oliy toifali o'quv qurollari, mukammal test tahlillari va professional rivojlanish vositalari bir joyda.
        </p>

        {/* Current status summary in header */}
        <div className="user-status-card">
          <div className="user-status-card__info">
            <div className="user-avatar-gold">
              {profile?.full_name ? profile.full_name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h3>{profile?.full_name || 'Foydalanuvchi'}</h3>
              <p>Joriy profilingiz holati</p>
            </div>
          </div>
          <div className="user-status-card__tier">
            {isPro ? (
              <span className="tier-badge tier-badge--pro">👑 PRO PLAN FAOL</span>
            ) : (
              <span className="tier-badge tier-badge--free">BEPUL TARIF</span>
            )}
          </div>
        </div>
      </div>

      {/* Main pricing & features grid */}
      <div className="premium-main-grid">
        
        {/* Left Column: Plans and subscription panel */}
        <div className="premium-billing-panel">
          <h2>Kutubxonani To'liq Ochish</h2>
          <p className="panel-subtitle">Quyidagi premium obuna rejalaridan birini tanlang va o'rganishni hoziroq boshlang:</p>

          <div className="pricing-selector-grid">
            {/* Monthly Plan Card */}
            <div 
              className={`plan-selector-card ${selectedPlan === 'monthly' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('monthly')}
            >
              {selectedPlan === 'monthly' && <div className="selected-glow" />}
              <div className="plan-header">
                <h3>{plans.monthly.name}</h3>
                <p className="plan-tagline">{plans.monthly.tagline}</p>
              </div>
              <div className="plan-price-row">
                <span className="plan-price">{plans.monthly.price}</span>
                <span className="plan-period">/ {plans.monthly.period}</span>
              </div>
              <div className="plan-footer-features">
                <span><FiCheck /> Moslashuvchan to'lov</span>
                <span><FiCheck /> Istalgan vaqtda bekor qilish</span>
              </div>
            </div>

            {/* Annual Plan Card */}
            <div 
              className={`plan-selector-card annual-card ${selectedPlan === 'annual' ? 'active' : ''}`}
              onClick={() => setSelectedPlan('annual')}
            >
              {plans.annual.popular && <span className="popular-badge">ENG FOYDALI</span>}
              {selectedPlan === 'annual' && <div className="selected-glow" />}
              <div className="plan-header">
                <h3>{plans.annual.name}</h3>
                <p className="plan-tagline">{plans.annual.tagline}</p>
              </div>
              <div className="plan-price-row">
                <span className="plan-price">{plans.annual.price}</span>
                <span className="plan-period">/ {plans.annual.period}</span>
              </div>
              {plans.annual.savings && (
                <div className="savings-highlight">
                  <FiZap /> {plans.annual.savings}
                </div>
              )}
              <div className="plan-footer-features">
                <span><FiCheck /> Yillik to'liq o'quv yili</span>
                <span><FiCheck /> 42% chegirma ulushi</span>
              </div>
            </div>
          </div>

          {/* Checkout Action Box */}
          <div className="checkout-action-box">
            {isPro ? (
              <div className="active-pro-actions">
                <div className="pro-active-message">
                  <FiCheckCircle className="pro-shield-icon" />
                  <div>
                    <h4>Sizda premium a'zolik faol!</h4>
                    <p>
                      Obunangiz to'liq ishlamoqda. 
                      {profile?.pro_expires_at && ` Amal qilish muddati: ${new Date(profile.pro_expires_at).toLocaleDateString()}.`} 
                      Yangi darsliklar va sertifikatlarni o'rganishda davom eting.
                    </p>
                  </div>
                </div>
                <button 
                  className="checkout-btn checkout-btn--cancel"
                  onClick={handleCancelSubscription}
                  disabled={upgrading}
                >
                  {upgrading ? "Bekor qilinmoqda..." : "PRO Obunani Bekor Qilish"}
                </button>
              </div>
            ) : (
              <div className="checkout-purchase-actions">
                <div className="price-summary">
                  <span>To'lov uchun:</span>
                  <strong>{plans[selectedPlan].price} ({selectedPlan === 'monthly' ? 'Oylik' : 'Yillik'})</strong>
                </div>
                <button 
                  className="checkout-btn checkout-btn--purchase"
                  onClick={startPaymentFlow}
                >
                  Karta orqali to'lash ⚡
                </button>
                <button 
                  className="checkout-btn checkout-btn--cash"
                  onClick={() => setShowCashModal(true)}
                  style={{ marginTop: '10px', background: 'linear-gradient(135deg, #2ecc71, #27ae60)' }}
                >
                  Naqd pul bilan to'lash 💵
                </button>
                <p className="disclaimer-text">
                  <FiInfo /> Bosish orqali siz foydalanish shartlariga rozilik bildirasiz.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Comparative Value Column */}
        <div className="premium-features-value">
          <h2>PRO va Bepul imkoniyatlar</h2>
          <p className="panel-subtitle">BioSmart PRO a'zoligi orqali biologiyani yanada chuqurroq o'rganing.</p>

          <div className="comparison-table">
            <div className="comparison-header-row">
              <span className="feat-col">Imkoniyat</span>
              <span className="tier-col text-center">Bepul</span>
              <span className="tier-col text-center gold-text">PRO</span>
            </div>

            <div className="comparison-row">
              <span className="feat-col">
                <FiBookOpen className="feat-icon" />
                <div>
                  <strong>5-8 sinf darsliklari</strong>
                  <p>Umumiy tayyorlov uchun darsliklar jamlanmasi</p>
                </div>
              </span>
              <span className="tier-col text-center"><FiCheck className="check-green" /></span>
              <span className="tier-col text-center"><FiCheck className="check-gold" /></span>
            </div>

            <div className="comparison-row">
              <span className="feat-col">
                <FiBookOpen className="feat-icon active-icon" />
                <div>
                  <strong>9-11 sinf darsliklari</strong>
                  <p>DTM darajasidagi mukammal darsliklar</p>
                </div>
              </span>
              <span className="tier-col text-center empty-col">—</span>
              <span className="tier-col text-center"><FiCheck className="check-gold" /></span>
            </div>

            <div className="comparison-row">
              <span className="feat-col">
                <FiActivity className="feat-icon" />
                <div>
                  <strong>Mavzulashtirilgan testlar</strong>
                  <p>Har bir mavzu oxiridagi bilim sinovlari</p>
                </div>
              </span>
              <span className="tier-col text-center"><FiCheck className="check-green" /></span>
              <span className="tier-col text-center"><FiCheck className="check-gold" /></span>
            </div>

            <div className="comparison-row">
              <span className="feat-col">
                <FiZap className="feat-icon active-icon" />
                <div>
                  <strong>Aralash va DTM mock testlar</strong>
                  <p>Haqiqiy imtihon muhitidagi cheksiz testlar</p>
                </div>
              </span>
              <span className="tier-col text-center empty-col">—</span>
              <span className="tier-col text-center"><FiCheck className="check-gold" /></span>
            </div>

            <div className="comparison-row">
              <span className="feat-col">
                <FiTrendingUp className="feat-icon active-icon" />
                <div>
                  <strong>Xatolar ustida ishlash bo'limi</strong>
                  <p>Xato testlarni tizimli tahlil qilish imkoniyati</p>
                </div>
              </span>
              <span className="tier-col text-center empty-col">—</span>
              <span className="tier-col text-center"><FiCheck className="check-gold" /></span>
            </div>

            <div className="comparison-row">
              <span className="feat-col">
                <FiAward className="feat-icon active-icon" />
                <div>
                  <strong>Oltin sertifikatlar 🏆</strong>
                  <p>Muvaffaqiyatli topshirilgan imtihonlar uchun sertifikat</p>
                </div>
              </span>
              <span className="tier-col text-center empty-col">—</span>
              <span className="tier-col text-center"><FiCheck className="check-gold" /></span>
            </div>

            <div className="comparison-row">
              <span className="feat-col">
                <FiShield className="feat-icon active-icon" />
                <div>
                  <strong>Reklamasiz interfeys va cheksiz tezlik ⚡</strong>
                  <p>Faqatgina ta'limga yo'naltirilgan tezkor oyna</p>
                </div>
              </span>
              <span className="tier-col text-center empty-col">—</span>
              <span className="tier-col text-center"><FiCheck className="check-gold" /></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// SVGs for Logos
const ClickLogoSVG = () => (
  <svg className="click-logo-svg" viewBox="0 0 250 80" width="110" height="35">
    <defs>
      <linearGradient id="click-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00c6ff" />
        <stop offset="100%" stopColor="#0072ff" />
      </linearGradient>
    </defs>
    <circle cx="35" cy="40" r="28" fill="url(#click-cyan)" />
    <path d="M26,45 L38,32 L46,40 L54,26" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <text x="75" y="48" fill="#ffffff" fontSize="34" fontWeight="800" fontFamily="'Outfit', sans-serif">click</text>
    <text x="158" y="48" fill="#00c6ff" fontSize="34" fontWeight="800" fontFamily="'Outfit', sans-serif">pay</text>
  </svg>
);

const UzcardLogoSVG = () => (
  <svg viewBox="0 0 100 40" width="55" height="22" className="card-brand-logo">
    <rect width="100" height="40" rx="6" fill="#144d83" />
    <text x="50" y="25" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="0.8" fontFamily="Arial, sans-serif">UZCARD</text>
  </svg>
);

const HumoLogoSVG = () => (
  <svg viewBox="0 0 100 40" width="55" height="22" className="card-brand-logo">
    <rect width="100" height="40" rx="6" fill="#fb8c00" />
    <text x="50" y="25" fill="#ffffff" fontSize="14" fontWeight="900" textAnchor="middle" fontFamily="Arial, sans-serif">HUMO</text>
  </svg>
);

const VisaLogoSVG = () => (
  <svg viewBox="0 0 100 40" width="55" height="22" className="card-brand-logo">
    <rect width="100" height="40" rx="6" fill="#1a1f71" />
    <text x="50" y="26" fill="#ffffff" fontSize="18" fontWeight="bold" fontStyle="italic" textAnchor="middle" fontFamily="Arial, sans-serif">VISA</text>
  </svg>
);
