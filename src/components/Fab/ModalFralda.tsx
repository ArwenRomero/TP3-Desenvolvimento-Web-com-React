import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RecordContext } from '../../context/RecordContext';
import { ptBR } from 'date-fns/locale';

interface ModalFraldaProps {
  open: boolean;
  onClose: () => void;
}

interface FraldaRecord {
  estado: string;
  horario: Date | null;
  observacoes: string;
}

const ModalFralda: React.FC<ModalFraldaProps> = ({ open, onClose }) => {
  const { addRecord } = useContext(RecordContext);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [fraldaState, setFraldaState] = useState<string>('');
  const [observacoes, setObservacoes] = useState<string>('');

  const handleSave = () => {
    const record: FraldaRecord = {
      estado: fraldaState,
      horario: selectedDateTime,
      observacoes,
    };

    addRecord('fralda', record);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registro de Fralda</DialogTitle>
      <DialogContent>
        <div>
          <p>Estado da Fralda:</p>
          <div className="fralda-options">
            <Button variant="outlined" onClick={() => setFraldaState('Suja de Urina')}>
              Suja de Urina
            </Button>
            <Button variant="outlined" onClick={() => setFraldaState('Suja de Fezes')}>
              Suja de Fezes
            </Button>
            <Button variant="outlined" onClick={() => setFraldaState('Ambas')}>
              Ambas
            </Button>
            <Button variant="outlined" onClick={() => setFraldaState('Limpa')}>
              Limpa
            </Button>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
            <DateTimePicker
              label="Horário da troca"
              value={selectedDateTime}
              onChange={(date) => setSelectedDateTime(date)}
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
          style={{ marginTop: '20px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFralda;
