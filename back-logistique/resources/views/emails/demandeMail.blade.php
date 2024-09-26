@component('mail::message')

        # Demande

        Demande faite par  {{ $orderDetails['demandeur'] }} !

        **Type de demande :** {{ $orderDetails['typedemande'] }}

        **Description de la demande :**
        {{ $orderDetails['description'] }}


        Chef comptable,
        {{ config('app.name') }}
@endcomponent
