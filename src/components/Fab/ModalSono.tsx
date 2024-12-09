import React, { useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RecordContext } from '../../context/RecordContext';
import { ptBR } from 'date-fns/locale';

export default function ModalSono({ open, onClose }) {
    const { addRecord } = useContext(RecordContext); // Consume o contexto
    const [startDateTime, setStartDateTime] = useState(null);
    const [endDateTime, setEndDateTime] = useState(null);
    const [observacoes, setObservacoes] = useState('');

    const handleSave = () => {
        // Adiciona o registro ao contexto
        addRecord('sono', {
            inicio: startDateTime,
            fim: endDateTime,
            observacoes,
        });

        // Fecha o modal
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Registro de Sono</DialogTitle>
            <DialogContent>
                <div style={{ marginBottom: '20px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                        <DateTimePicker
                            label="Horário de início"
                            value={startDateTime}
                            onChange={(date) => setStartDateTime(date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                        <DateTimePicker
                            label="Horário de término"
                            value={endDateTime}
                            onChange={(date) => setEndDateTime(date)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </div>
                <TextField
                    label="Observações"
                    multiline
                    rows={4}
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} color="primary" variant="contained">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}
