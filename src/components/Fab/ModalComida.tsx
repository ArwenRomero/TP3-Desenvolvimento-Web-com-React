import React, { useState, useContext } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { RecordContext } from '../../context/RecordContext';
import { ptBR } from 'date-fns/locale';

interface ModalAmamentacaoProps {
  open: boolean;
  onClose: () => void;
}

interface AmamentacaoRecord {
  inicio: Date | null;
  fim: Date | null;
  tipo: string;
  lado: string | null;
  quantidade: string | null;
  observacoes: string;
}

const ModalAmamentacao: React.FC<ModalAmamentacaoProps> = ({ open, onClose }) => {
  const { addRecord } = useContext(RecordContext);
  const [startDateTime, setStartDateTime] = useState<Date | null>(null);
  const [endDateTime, setEndDateTime] = useState<Date | null>(null);
  const [amamentacaoTipo, setAmamentacaoTipo] = useState<string>('');
  const [ladoSeio, setLadoSeio] = useState<string>('');
  const [quantidadeMamadeira, setQuantidadeMamadeira] = useState<string>('');
  const [observacoes, setObservacoes] = useState<string>('');

  const handleSave = () => {
    const record: AmamentacaoRecord = {
      inicio: startDateTime,
      fim: endDateTime,
      tipo: amamentacaoTipo,
      lado: amamentacaoTipo === 'seio' ? ladoSeio : null,
      quantidade: amamentacaoTipo === 'mamadeira' ? quantidadeMamadeira : null,
      observacoes,
    };

    addRecord('amamentacao', record);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Registro de Amamentação</DialogTitle>
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

        <FormControl component="fieldset" style={{ marginBottom: '20px' }}>
          <RadioGroup value={amamentacaoTipo} onChange={(e) => setAmamentacaoTipo(e.target.value)}>
            <FormControlLabel value="mamadeira" control={<Radio />} label="Mamadeira" />
            <FormControlLabel value="seio" control={<Radio />} label="Seio" />
          </RadioGroup>
        </FormControl>

        {amamentacaoTipo === 'mamadeira' && (
          <TextField
            label="Quantidade (ml)"
            type="number"
            value={quantidadeMamadeira}
            onChange={(e) => setQuantidadeMamadeira(e.target.value)}
            fullWidth
            style={{ marginBottom: '20px' }}
            InputProps={{
              endAdornment: <InputAdornment position="end">ml</InputAdornment>,
            }}
          />
        )}

        {amamentacaoTipo === 'seio' && (
          <FormControl component="fieldset" style={{ marginBottom: '20px' }}>
            <RadioGroup value={ladoSeio} onChange={(e) => setLadoSeio(e.target.value)}>
              <FormControlLabel value="direito" control={<Radio />} label="Direito" />
              <FormControlLabel value="esquerdo" control={<Radio />} label="Esquerdo" />
              <FormControlLabel value="ambos" control={<Radio />} label="Ambos" />
            </RadioGroup>
          </FormControl>
        )}

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
        <Button onClick={handleSave} color="primary" variant="contained">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalAmamentacao;
