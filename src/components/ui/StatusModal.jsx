import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StatusModal = ({ isOpen, title, message, type = 'success', onClose }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Auto close after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const isSuccess = type === 'success';
    const color = isSuccess ? '#22c55e' : '#ef4444'; // Green or Red

    // Tick Animation
    const tickVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10000,
                backdropFilter: 'blur(4px)'
            }}>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    style={{
                        background: 'white',
                        padding: '3rem',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    {/* Circle Background */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: isSuccess ? '#dcfce7' : '#fee2e2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            position: 'relative'
                        }}
                    >
                        {/* Animated SVG */}
                        <svg width="60" height="60" viewBox="0 0 50 50" style={{ stroke: color, strokeWidth: 4, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}>
                            <motion.path
                                d="M10 25 L22 37 L40 13"
                                variants={tickVariants}
                                initial="hidden"
                                animate="visible"
                            />
                        </svg>
                    </motion.div>

                    <h2 style={{ margin: '0 0 0.5rem 0', color: '#1f2937', fontSize: '1.75rem' }}>{title}</h2>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '1.1rem' }}>{message}</p>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default StatusModal;
