El Teu Pas

El Teu Pas és una aplicació Android desenvolupada amb ViteJS, p5.js i Capacitor que permet fer un seguiment bàsic de l’activitat física diària mitjançant el recompte de passos. L’aplicació utilitza l’acceleròmetre del dispositiu per detectar el moviment i representa el progrés de l’usuari amb una animació generativa en canvas que evoluciona segons els passos realitzats.


Objectiu del projecte

L’objectiu principal del projecte és aprendre a:

Empaquetar una aplicació web com a app mòbil amb Capacitor.

Executar-la i provar-la en Android Studio i en un dispositiu real.

Integrar funcionalitats natives del dispositiu, com l’acceleròmetre.

Utilitzar p5.js per crear visualitzacions i animacions generatives.

Gestionar emmagatzematge local i configuració d’usuari.

Documentar correctament tot el procés de desenvolupament.

-Funcionalitats principals

-Recompte de passos mitjançant l’acceleròmetre del dispositiu.

-Animació generativa amb p5.js que evoluciona segons els passos realitzats.

-Objectiu diari de passos configurable per l’usuari.

Mode nit.

 -Emmagatzematge local de configuració i registre diari de passos.

 -Panell de configuració accessible des de la interfície.

 -Tecnologies utilitzades

ViteJS – Entorn de desenvolupament i empaquetador.

p5.js – Canvas i animació generativa.

Capacitor (Ionic) – Pont entre codi web i funcionalitats natives.

Android Studio – Execució en emulador i dispositiu real.

JavaScript (Vanilla), HTML5, CSS3.

No s’inclouen les carpetes node_modules ni www al repositori.

Com executar el projecte

1. Instal·lar dependències
npm install

2. Generar la build de producció
npm run build

3. Sincronitzar amb Android
npx cap sync android

4. Obrir a Android Studio
npx cap open android


Des d’Android Studio, executar l’app en un emulador o en un dispositiu Android real amb la depuració USB activada.


Millores previstes

Evitar el bloqueig de pantalla mentre l’app està en ús.

Integració d’una API externa de localització (OpenStreetMap / Nominatim).

Visualització d’històric setmanal o mensual de passos.

Millores en la detecció de passos i calibratge del sensor.



Llicència

Aquest projecte es distribueix sota la llicència MIT.