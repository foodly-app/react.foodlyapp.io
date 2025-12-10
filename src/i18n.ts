import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
    en: {
        translation: {
            "Restaurants": "Restaurants",
            "Airport": "Airport",
            "Rental": "Rental",
            "Hotel": "Hotel",
            "More": "More",
            "Tour Guide": "Tour Guide",
            "See All": "See All",
            "On Budget Tour": "On Budget Tour",
            "Search...": "Search...",
            "Frequently visited": "Frequently visited"
        }
    },
    ka: {
        translation: {
            "Restaurants": "რესტორნები",
            "Airport": "აეროპორტი",
            "Rental": "გაქირავება",
            "Hotel": "სასტუმრო",
            "More": "მეტი",
            "Tour Guide": "გიდი",
            "See All": "ყველა",
            "On Budget Tour": "ბიუჯეტური ტურები",
            "Search...": "ძიება...",
            "Frequently visited": "ხშირად მონახულებული"

        }
    },
    ru: {
        translation: {
            "Restaurants": "Рестораны",
            "Airport": "Аэропорт",
            "Rental": "Аренда",
            "Hotel": "Отель",
            "More": "Ещё",
            "Tour Guide": "Гид",
            "See All": "Посмотреть все",
            "On Budget Tour": "Бюджетные туры",
            "Search...": "Поиск...",
            "Frequently visited": "Часто посещаемые"
        }
    },
    tr: {
        translation: {
            "Restaurants": "Restoranlar",
            "Airport": "Havalimanı",
            "Rental": "Kiralama",
            "Hotel": "Otel",
            "More": "Daha",
            "Tour Guide": "Tur Rehberi",
            "See All": "Hepsini Gör",
            "On Budget Tour": "Bütçe Dostu Tur",
            "Search...": "Ara...",
            "Frequently visited": "Sık ziyaret edilenler"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en", // default language
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
