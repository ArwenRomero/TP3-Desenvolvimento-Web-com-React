import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BabyInfoContext } from '../../context/BabyInfoContext';
import { RecordContext } from '../../context/RecordContext';
import BabyCard from '../../components/BabyCard';
import Card from '../../components/Card';
import { Snackbar, Tabs, Tab, Box, Typography, Alert } from '@mui/material';
import '../../styles/views/dashboard.scss';

export default function Dashboard() {
    const { babyInfo } = useContext(BabyInfoContext);
    const { records } = useContext(RecordContext);
    const { t } = useTranslation();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [tabIndex, setTabIndex] = useState(0);

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const sortRecordsByDateDesc = (records) =>
        [...records].sort((a, b) => new Date(b.horario) - new Date(a.horario));

    return (
        <div className="Dashboard">
            <div className="container">
                <Typography variant="h4" component="h1" gutterBottom>
                    {t('Welcome to Dashboard')}
                </Typography>

                <BabyCard name={babyInfo.name} weight={babyInfo.weight} length={babyInfo.length} />

                <Box sx={{ width: '100%' }}>
                    <Tabs value={tabIndex} onChange={handleTabChange} aria-label={t('Category of Records')}>
                        <Tab label={t('Diaper Changes')} />
                        <Tab label={t('Sleep')} />
                        <Tab label={t('Feeding')} />
                    </Tabs>

                    {tabIndex === 0 && (
                        <div className="card-container">
                            {sortRecordsByDateDesc(records.fralda).map((record, index) => (
                                <Card
                                    key={index}
                                    title={t('Diaper Change')}
                                    value={`Estado: ${record.estado}`}
                                    description={`Horário: ${new Date(record.horario).toLocaleString()} \n Observações: ${record.observacoes || t('No observations')}`}
                                    onEdit={() => showSnackbar(t('Editing diaper change'), 'info')}
                                    onDelete={() => showSnackbar(t('Diaper deleted successfully'), 'error')}
                                />
                            ))}
                        </div>
                    )}

                    {tabIndex === 1 && (
                        <div className="card-container">
                            {sortRecordsByDateDesc(records.sono).map((record, index) => (
                                <Card
                                    key={index}
                                    title={t('Sleep')}
                                    value={`Início: ${new Date(record.inicio).toLocaleString()} - Fim: ${new Date(record.fim).toLocaleString()}`}
                                    description={`Observações: ${record.observacoes || t('No observations')}`}
                                    onEdit={() => showSnackbar(t('Editing sleep record'), 'info')}
                                    onDelete={() => showSnackbar(t('Sleep record deleted successfully'), 'error')}
                                />
                            ))}
                        </div>
                    )}

                    {tabIndex === 2 && (
                        <div className="card-container">
                            {sortRecordsByDateDesc(records.amamentacao).map((record, index) => (
                                <Card
                                    key={index}
                                    title={t('Feeding')}
                                    value={
                                        record.tipo === 'mamadeira'
                                            ? `Quantidade: ${record.quantidade} ml`
                                            : `Lado: ${record.lado}`
                                    }
                                    description={`Início: ${new Date(record.inicio).toLocaleString()} - Fim: ${new Date(record.fim).toLocaleString()} \n Observações: ${record.observacoes || t('No observations')}`}
                                    onEdit={() => showSnackbar(t('Editing feeding record'), 'info')}
                                    onDelete={() => showSnackbar(t('Feeding record deleted successfully'), 'error')}
                                />
                            ))}
                        </div>
                    )}
                </Box>
            </div>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}
