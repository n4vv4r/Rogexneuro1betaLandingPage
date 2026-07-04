# Conectar EEG real a PRISMA 3

PRISMA 3 aplica el MISMO pipeline (preprocesado -> ventanas -> features -> baseline
-> traductor individual) a señal simulada y real. Hay tres vías de entrada.

## 1. CSV
Columnas: `timestamp, ch1, ch2, ...` (opcionales: `hrv, breath_rate, emotion_label,
task_label`). Desde la UI: página **Importar CSV**. Desde código:
```python
from src.utils.io import read_eeg_csv
rec = read_eeg_csv("mis_datos.csv")   # {data:[n_ch,n], fs, ch_names, ...}
```

## 2. Ficheros MNE (.edf / .set / .bdf / .vhdr / .fif)
Es el formato de OpenNeuro / NEMAR / eegdash. Desde la UI: página **EEG real**.
Desde código:
```python
from src.utils.io import load_eeg_file, features_from_raw, mean_features
raw = load_eeg_file("sub-01_task-rest_eeg.edf")   # -> mne.io.Raw
feats, info = features_from_raw(raw, window_sec=2.0, overlap=0.5)
resumen = mean_features(feats)
```

## 3. eegdash / OpenNeuro (datasets públicos)
eegdash entrega objetos **MNE Raw**, así que se enchufa directo al adaptador MNE.
```bash
pip install eegdash
python analyze_eegdash.py --dataset NM000147 --cache ./data --n 3
```

### Si falla con "No route to host" (Errno 113)
Es un problema de RED de tu máquina llegando a `data.eegdash.org` (la API de
metadatos), no del script. Diagnóstico rápido:
```bash
getent ahosts data.eegdash.org      # ¿resuelve? ¿aparece IPv6 sin ruta?
curl -4 -v https://data.eegdash.org # fuerza IPv4
curl -I https://openneuro.org       # ¿tienes internet en general?
```
Y usa una vía que EVITA ese host:
```bash
# A) La más robusta: descarga los ficheros BIDS por cualquier medio y analiza
#    en local (100% independiente de eegdash):
python analyze_bids.py --path ./data/nm000147 --n 3

# B) HuggingFace (no usa data.eegdash.org):
python analyze_eegdash.py --from-hub EEGDash/nm000147 --cache ./data

# C) Offline (si ya tienes los ficheros en cache_dir/nm000147):
python analyze_eegdash.py --dataset NM000147 --offline --cache ./data
```
Dónde descargar los ficheros BIDS: portal `https://eegdash.org`, OpenNeuro/NEMAR
(fuente canónica), o el mirror HuggingFace `EEGDash/nm000147`. Una vez en disco,
`analyze_bids.py` los procesa igual.

`analyze_eegdash.py` demuestra el traductor individual sobre EEG real (baseline
con la 1ª mitad, interpretación de la 2ª como desviación intrasujeto) más IAF y
perfil espectral. NM000147: EEG 8 canales, 250 Hz, 44 sujetos, tarea P300/visual
(BIDS). Para clasificar tareas reales, usa los eventos BIDS (`raw.annotations` /
`events.tsv`) como etiquetas y evalúa con **LOSO** entre sujetos.

## 4. Tiempo real (Muse / OpenBCI) vía LSL
Placeholder preparado en `src/utils/lsl_stream.py`.
```bash
pip install pylsl
# Muse: muselsl stream    |    OpenBCI: GUI/brainflow -> LSL
```
```python
from src.utils.lsl_stream import LSLStream
lsl = LSLStream(fs=256, n_ch=4); lsl.connect()
sig, is_sim = lsl.get_window(win_sec=2.0)
```
Muse (4 canales) -> asimetría limitada; OpenBCI (8-16) -> más features espaciales.

## Notas de calidad
- Unidades: MNE entrega Voltios; el adaptador pasa a microvoltios. Las features
  relativas son invariantes a escala; `artifact_score`/SQI usan z-scores (también
  invariantes).
- Filtra red a 50 Hz (Europa) o 60 Hz (América): parámetro `line_hz`.
- Para artefactos serios, aplica ICA con MNE antes de extraer features.
