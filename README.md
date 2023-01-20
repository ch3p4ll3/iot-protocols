# versione MQTT

## Indice
- [Funzionamento](#funzionamento)
- [QOS](#qos)
- [Payload](#payload)
    - [Value](#value)
    - [Name](#name)
- [Topic](#topic)
- [Sicurezza](#sicurezza)
    - [Authentication](#authentication)
    - [Authorization](#authorization)
- [InfluxDB](#influxdb)

## Funzionamento
Il client ogni secondo invia le letture di 3 sensori singolarmente per permettere la divisione in [topic](#topic). 

I dati vengono letti da un'altro client MQTT(in nodejs) che riceve i dati letti e li salva su un database timeseries [influxdb](#influxdb).

## QOS
impostato a livello 2 per garantire che i dati arrivino esattamente una volta al broker

## Payload
Tipo di payload: Json

esempio di payload:
```json
{
    "Value": 5,
    "Name": "sensor_name"
}
```

### Value
Value rappresenta il valore del sensore

### Name
è il nome assegnato al sensore, viene utilizzato per salvare i dati su influxdb con un nome più "user friendly"

## Topic
Gestione dei topic per il progetto:
`silos/id_silos/tipo_sensore`

In questo modo è possibile poi categorizzare le misurazioni per silos e per tipo di sensore

## Sicurezza
### Authentication
Per evitare che chiunque possa accedere ai messaggi è possibile implementare un'autenticazione. Se il client è abbastanza potente da permettere la gestione dei certificati si può utilizzare un'autenticazione utilizzando dei certificati. Altrimenti si può utilizzare un'autenticazione a "username & password".

Come ultima spiaggia, se non è possibile per qualsiasi motivo implementare un'autenticazione, è sempre possibile criptare il payload con un algoritmo.

### Authorization
Ogni client ha l'autorizzazione a pubblicare solo nella sua area di competenza(es. il sensore con id 1 potrà pubblicare solo nel topic `silos/1/#`)

## InfluxDB
InfluxDB è un database timeseries, questo ci permette di salvare dati temporali più efficentemente rispetto ad un database relazionale. 

É stato creato un bucket chiamato `silos` dove vengono salvati i dati dei sensori. Il measurement è l'id del silos mentre il field ha come nome il nome del sensore.

es.
```
bucket: silos
├── silos_1
│   ├── sensor_name1: 40
│   ├── sensor_name2: 18
│   └── sensor_name3: 59
|
├── silos_2
│   ├── sensor_name1: 10
│   ├── sensor_name2: 85
│   └── sensor_name3: 69
|
└── silos_3
    ├── sensor_name1: 76
    ├── sensor_name2: 18
    └── sensor_name3: 45
```