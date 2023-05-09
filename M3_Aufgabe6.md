# Aufgabe 6

## 1. AccuWeather Current Conditions API
    - Zweck: Wettermessdaten für verschiedene geografische Standorte weltweit bereitstellen

    - ausgetauschte Daten: DateTime, Wetterdaten, Data Provider, Temperatur, Feuchtigkeit, Winddaten, UV-Index, Nebligkeit, Druck, Regendaten, etc.

    - umgesetzte REST Prinzipien:
        1. Client-Server-Aufteilung: Die AccuWeather API implementiert eine klare Trennung zwischen Client und Server. Der Client (z.B. eine App oder ein Webbrowser) sendet Anfragen an den Server, um Daten abzurufen oder zu manipulieren, und der Server liefert die angeforderten Daten zurück.
        2. Zustandslosigkeit: Der Server speichert keine Daten, sondern alle notwendigen Info sind auf den Request an den Server.
        3. Cacheable: Clients können abgerufene Daten zwischenspeichern.
        4. Einheitliche Schnittstelle: Clients und Server miteinander mit standardisierten HTTP-Methoden, URIs und Datenformaten kommunizieren

    - Level im RMM: Level 2. URIs verwenden, um Ressourcen zu identifizieren, und HTTP-Methoden verwenden, um diese Ressourcen zu manipulieren, z.B.
      ```
        http://dataservice.accuweather.com/currentconditions/v1/{locationKey}
      ```
      => aktuelle Wetter- & Temperaturdaten für den gesetzten Ort mit der "locationKey" über GET-Methode abrufen

    - Versioning: erfolgt über URL-Parameter "v", der in den API-Aufrufen enthalten ist, z.B.
      ```
        http://dataservice.accuweather.com/currentconditions/v1/{locationKey}
      ```
      => Version 1


## 2. Google Places API
    - Zweck: Zugang zu Informationen über Orte zu geben, einschließlich geografischer Koordinaten, Adressen, Öffnungszeiten, Bewertungen und Fotos.

    - ausgetauschte Daten: Adresse, Koordinaten, Ortname, Öffnungszeiten, Ratings, Lieferungen, Preisstufe, Reviews, Webseite, etc.

    - umgesetzte REST Prinzipien:
        1. Client-Server-Aufteilung
        2. Zustandslosigkeit
        3. Einheitliche Schnittstelle
        4. Mehrschichtige Systeme: Auf mehrere Serverebenen aufgeteilt werden, um Skalierbarkeit und Flexibilität zu verbessern. Z.B.:
            * Caching-Servern, um die Reaktionszeit der API zu verbessern und die Serverlast zu reduzieren. Wenn ein Client eine Anfrage an die API sendet, überprüft der Caching-Server zuerst, ob die Antwort für diese Anfrage bereits im Cache gespeichert ist. Wenn ja, gibt der Caching-Server diese Antwort zurück, ohne dass der Anfrage an den API-Server gesendet werden muss, was die Reaktionszeit reduziert. Wenn die Antwort nicht im Cache gespeichert ist, leitet der Caching-Server die Anfrage an den API-Server weiter, um die Antwort zu erhalten, die dann im Cache gespeichert wird, um zukünftige Anfragen zu beschleunigen.
            * Lastausgleichsserver (Load Balancer), um eingehende Anfragen an mehrere API-Server zu verteilen, um die Last auf mehrere Server zu verteilen und sicherzustellen, dass jeder Server eine angemessene Last erhält, um eine Überlastung zu vermeiden.

    - Level im RMM: Level 2. URIs verwenden, um Ressourcen zu identifizieren, und HTTP-Methoden verwenden, um diese Ressourcen zu manipulieren, z.B.
      ```
        https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJLU7jZClu5kcR4PcOOO6p3I0&key=YOUR_API_KEY
      ```
      => "details" für den Ort mit der "place_id" über GET-Methode abrufen

    - Versioning: erfolgt über URL-Parameter "v", der in den API-Aufrufen enthalten ist, z.B.
      ```
        https://maps.googleapis.com/maps/api/place/details/json?**v=3.51**&place_id=ChIJLU7jZClu5kcR4PcOOO6p3I0&key=YOUR_API_KEY
      ```
      => Version 3.51
