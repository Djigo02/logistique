
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>{{ $orderDetails['objet'] }}</title>
        </head>
        <body>
        <h2>Objet : {{ $orderDetails['objet'] }}</h2>
        <p>
            <strong>Demande faite par  {{ $orderDetails['demandeur'] }}  du campus : {{ $orderDetails['campus'] }} !</strong>,<br>

            **Description de la demande :**
            <br>
            <br>
            {{ $orderDetails['description'] }}
            <br>
            Message provenant,<br>
            <strong>{{ config('app.name') }}</strong>
        </p>
        </body>
        </html>
