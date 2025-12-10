import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const languages = [
        { code: 'en', label: '🇺🇸 EN' },
        { code: 'ka', label: '🇬🇪 KA' },
        { code: 'ru', label: '🇷🇺 RU' },
        { code: 'tr', label: '🇹🇷 TR' }
    ];

    return (
        <div className="language-switcher d-flex gap-8 align-items-center">
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`btn-lang ${i18n.language === lang.code ? 'active' : ''}`}
                    style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: i18n.language === lang.code ? '1px solid var(--primary)' : '1px solid transparent',
                        fontWeight: i18n.language === lang.code ? 'bold' : 'normal',
                        opacity: i18n.language === lang.code ? 1 : 0.7
                    }}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
