# AutocompleteMapsGeocoder

Exemplo de uso da biblioteca: [http://autocompletemapgeocoder.herokuapp.com/](http://autocompletemapgeocoder.herokuapp.com/)

Esta biblioteca depende de jQuery e jQuery-UI, e faz uso da função `$`

Esta biblioteca fornece uma classe denominada AutocompleteMapsGeocoder, cujo objetivo é fornecer uma forma simples de obter a latitude e longitude de um endereço digitado. Este plugin faz uso do jquery autocomplete para fornecer opcões para autocompletar o endereço que um usuário digitar baseado nas respostas do google maps, e exibe o endereço selecionado no mapa.

Além disso, também é possível que o usuário mova o marcador do endereço no mapa, e isso atualiza o endereço digitável.

Para criar um novo endereço com autocomplete e visualização no mapa, basta utilizar:
    
    map = new AutocompleteMapGeocoder(mapSelector, addressSelector, latSelector, lonSelector, initialLat, initialLon);

Os parâmetros são:
* mapSelector: seletor da div ou elemento onde o mapa será criado
* addressSelector: seletor do elemento de input onde será digitado o endereço
* latSelector: seletor do elemento de input onde será armazenado a latitude encontrada (podendo ser um input type=hidden)
* lonSelector: seletor do elemento de input onde será armazenado a longitude encontrada (podendo ser um input type=hidden)
* initialLat: latitude inicial do marcador e onde o mapa estará centralizado
* initialLon: longitude inicial do marcador e onde o mapa estará centralizado

Um exemplo de uso seria:

    map = new AutocompleteMapGeocoder("#map-canvas", "#address", "#latitude", "#longitude", -23.548881, -46.638336);

O Arquivo example.html contém um html mínimo de exemplo para que utiliza esta biblioteca, e é o mesmo arquivo presente no exemplo descrito acima. Ao tentar submeter o formulário são informados os atributos serializados do formulário, contendo o endereço e a latitude e longitude encontrados.
