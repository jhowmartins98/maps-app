import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Pega a div do html e coloca ela na variavel mapRef
  @ViewChild('map') mapRef!: ElementRef;

  // Cria uma variável para o Maps
  map!: google.maps.Map;

  constructor() {}

  async exibirMapa(){
     
    // The location of Uluru
  const position = { lat: -22.516133, lng: -48.566900 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  

  // The map, centered at Uluru
  this.map = new Map(
    this.mapRef.nativeElement,
    {
      zoom: 16,
      center: position,
      mapId: 'DEMO_MAP_ID',
    }
  );

  this.buscarLocalizacao();

  }
 

  ionViewWillEnter(){
    this.exibirMapa();
  }

  async buscarLocalizacao(){
    
    const coordinates = await Geolocation.getCurrentPosition({enableHighAccuracy: true});

  console.log('Current position:', coordinates);

  this.map.setCenter({
    lat: coordinates.coords.latitude, 
    lng: coordinates.coords.longitude
  })

  this.map.setZoom(18);

  this.adicionarMarcador(coordinates);
  
  }

  async adicionarMarcador(position: Position){

    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const marker = new AdvancedMarkerElement({
      map: this.map,
      position:{
        lat: position.coords.latitude, 
        lng: position.coords.longitude
      },
      title: 'Marcador'
    }); 
    
  }

}
