import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../../Layout/Header/index';
import { BabyInfoContext } from '../../context/BabyInfoContext.jsx';
import { AlertContext } from '../../context/Alert/index.js';
import '../../styles/views/settings.scss';

export default function Settings() {
    const { t, i18n } = useTranslation();
    const { babyInfo, setBabyInfo } = useContext(BabyInfoContext);
    const { showAlert } = useContext(AlertContext);

    const [name, setName] = useState(babyInfo.name);
    const [weight, setWeight] = useState(babyInfo.weight);
    const [length, setLength] = useState(babyInfo.length);
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const handleLanguageChange = (lang) => {
        setSelectedLanguage(lang);
    };

    const handleSave = (e) => {
        e.preventDefault();
        setBabyInfo({ name, weight, length });

        i18n.changeLanguage(selectedLanguage);

        showAlert(t("Changes Saved"), "success");
    };

    return (
        <div className="settings-container">
            <Header />
            <div className="language-switcher">
                <button onClick={() => handleLanguageChange('en')}>{t("English")}</button>
                <button onClick={() => handleLanguageChange('pt-BR')}>{t("Português")}</button>
                <button onClick={() => handleLanguageChange('es')}>{t("Español")}</button>
            </div>
            <h1>{t("Settings")}</h1>
            <div className="form-container">
                <form onSubmit={handleSave}>
                    <div className="form-group">
                        <label>{t("Name")}</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder={t("Enter Name")} 
                        />
                    </div>
                    <div className="form-group">
                        <label>{t("Weight")}</label>
                        <input 
                            type="text" 
                            value={weight} 
                            onChange={(e) => setWeight(e.target.value)} 
                            placeholder={t("Enter Weight")} 
                        />
                    </div>
                    <div className="form-group">
                        <label>{t("Length")}</label>
                        <input 
                            type="number" 
                            value={length} 
                            onChange={(e) => setLength(e.target.value)} 
                            placeholder={t("Enter Length")} 
                        />
                    </div>
                    <button type="submit">{t("Save")}</button>
                </form>
            </div>
        </div>
    );
}
