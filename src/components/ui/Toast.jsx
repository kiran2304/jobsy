import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

const Toast = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const variants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    const styles = {
        success: { bg: '#dcfce7', border: '#86efac', text: '#166534', icon: <CheckCircle size={20} /> },
        error: { bg: '#fee2e2', border: '#fca5a5', text: '#991b1b', icon: <AlertCircle size={20} /> },
        warning: { bg: '#fef3c7', border: '#fcd34d', text: '#92400e', icon: <AlertTriangle size={20} /> },
        info: { bg: '#e0f2fe', border: '#7dd3fc', text: '#075985', icon: <Info size={20} /> }
    };

    const currentStyle = styles[type] || styles.info;

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                background: currentStyle.bg,
                border: `1px solid ${currentStyle.border}`,
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                zIndex: 9999,
                minWidth: '300px',
                maxWidth: '400px'
            }}
        >
            <span style={{ color: currentStyle.text }}>{currentStyle.icon}</span>
            <p style={{ margin: 0, flex: 1, color: currentStyle.text, fontSize: '0.95rem', fontWeight: 500 }}>{message}</p>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: currentStyle.text, opacity: 0.7 }}>
                <X size={18} />
            </button>
        </motion.div>
    );
};

export default Toast;
