import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const languages = [
        { code: 'en', label: '🇺🇸 EN' },
        { code: 'ka', label: '🇬🇪 KA' },
        { code: 'ru', label: '🇷🇺 RU' },
        { code: 'tr', label: '🇹🇷 TR' }
    ];

    return (
        <div className="language-switcher-dropdown" ref={dropdownRef} style={{ position: 'relative' }}>
            <button
                onClick={toggleDropdown}
                className="btn-lang-toggle"
                style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12H22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {isOpen && (
                <div className="lang-dropdown-menu" style={{
                    position: 'absolute',
                    top: '120%',
                    right: '-20px',
                    background: 'var(--card-bg, #fff)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: '8px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    minWidth: '140px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px 12px',
                                border: 'none',
                                background: i18n.language === lang.code ? 'var(--primary, #2041df)' : 'transparent',
                                color: i18n.language === lang.code ? 'white' : 'var(--text-main, #333)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                justifyContent: 'flex-start',
                                width: '100%'
                            }}
                        >
                            <span style={{ fontSize: '18px' }}>{lang.label.split(' ')[0]}</span>
                            <span>{lang.label.split(' ')[1]}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
