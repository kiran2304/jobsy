import React, { createContext, useContext, useState, useCallback } from 'react';
import Modal from '../components/ui/Modal';
import Toast from '../components/ui/Toast';
import StatusModal from '../components/ui/StatusModal';
import { AnimatePresence } from 'framer-motion';

const UIContext = createContext();

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};

export const UIProvider = ({ children }) => {


    // Modal State
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        onCancel: () => { },
        type: 'danger'
    });

    // Toast State
    const [toasts, setToasts] = useState([]);

    // Status Modal State
    const [statusModal, setStatusModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success'
    });

    // Modal Methods
    const confirm = useCallback((message, title = 'Are you sure?') => {
        return new Promise((resolve) => {
            setModal({
                isOpen: true,
                title,
                message,
                type: 'danger',
                onConfirm: () => {
                    setModal(prev => ({ ...prev, isOpen: false }));
                    resolve(true);
                },
                onCancel: () => {
                    setModal(prev => ({ ...prev, isOpen: false }));
                    resolve(false);
                }
            });
        });
    }, []);

    const alert = useCallback((message, title = 'Alert') => {
        return new Promise((resolve) => {
            setModal({
                isOpen: true,
                title,
                message,
                confirmText: 'OK',
                cancelText: 'Close',
                type: 'info',
                onConfirm: () => {
                    setModal(prev => ({ ...prev, isOpen: false }));
                    resolve(true);
                },
                onCancel: () => {
                    setModal(prev => ({ ...prev, isOpen: false }));
                    resolve(true);
                }
            });
        });
    }, []);

    // Toast Methods
    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    // Status Modal Methods
    const showStatus = useCallback((title, message, type = 'success') => {
        setStatusModal({
            isOpen: true,
            title,
            message,
            type
        });
    }, []);

    const closeStatus = useCallback(() => {
        setStatusModal(prev => ({ ...prev, isOpen: false }));
    }, []);


    return (
        <UIContext.Provider value={{ confirm, alert, showToast, removeToast, showStatus }}>

            {children}

            {/* Modal Container */}
            {modal.isOpen && (
                <Modal
                    isOpen={modal.isOpen}
                    title={modal.title}
                    message={modal.message}
                    onConfirm={modal.onConfirm}
                    onCancel={modal.onCancel}
                    type={modal.type}
                />
            )}

            {/* Status Modal */}
            <AnimatePresence>
                {statusModal.isOpen && (
                    <StatusModal
                        isOpen={statusModal.isOpen}
                        title={statusModal.title}
                        message={statusModal.message}
                        type={statusModal.type}
                        onClose={closeStatus}
                    />
                )}
            </AnimatePresence>

            {/* Toast Container */}
            <div style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                zIndex: 9999,
                pointerEvents: 'none'
            }}>
                <AnimatePresence>
                    {toasts.map(toast => (
                        <div key={toast.id} style={{ pointerEvents: 'auto' }}>
                            <Toast
                                message={toast.message}
                                type={toast.type}
                                onClose={() => removeToast(toast.id)}
                            />
                        </div>
                    ))}
                </AnimatePresence>
            </div>
        </UIContext.Provider>
    );
};
