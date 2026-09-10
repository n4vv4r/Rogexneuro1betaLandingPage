# Arquitectura tècnica

## Separació per plataforma

El codi genèric viu a `kernel/`, `fs/`, `userland/` i `ui/`. Les implementacions concretes viuen sota `arch/x86_64`, `arch/aarch64` i els controladors de plataforma. `make portability` evita que els arbres genèrics depenguin accidentalment d'una arquitectura.

En x86, GRUB lliura un handoff Multiboot2 tant sota BIOS com sota OVMF. En AArch64, la mateixa imatge pot arrencar directament o com a aplicació UEFI; el stub preserva el mapa de memòria lliurat pel firmware.

## Runtime determinista

El pipeline robòtic usa quatre cues acotades:

1. sensors cap al runtime;
2. intencions produïdes;
3. intencions pendents del safety gate;
4. intencions aprovades cap a l'autopilot.

Els registres no contenen punters ni floats. El temps és monòton, les unitats són fixes i cada intenció conserva la seqüència i el temps de l'esdeveniment causal. Les guardes de pila, drops, expiracions i marques màximes es publiquen a cada informe.

## Safety gate

El gate valida ABI, rang, frescor, deadline, bateria, enllaç i geofence. Pot acceptar, limitar o bloquejar; una decisió corregida no es compta com una acceptació del productor. El watchdog produeix una intenció segura quan venç el termini.

## MAVLink i PX4

El parser MAVLink 2 és incremental, valida CRC i flags incompatibles, segueix la seqüència per emissor i només descodifica els missatges declarats. Converteix telemetria a Sensor ABI i intencions aprovades en consignes d'alt nivell. PX4 continua sent el controlador de vol.

## Disc

La pila d'emmagatzematge comparteix una interfície de blocs. NVMe aporta identificació, cues d'ordres, timeouts i propagació d'errors. GPT i RXFS permeten verificar la persistència després d'un reinici real de la VM.

## Relació amb echoAI

echOS és el cos; echoAI és una línia de recerca separada i es manté fora. La unió futura és una ABI de sensors i intencions, no un chatbot dins del nucli.

— R.N.
