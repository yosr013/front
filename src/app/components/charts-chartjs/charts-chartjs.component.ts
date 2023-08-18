import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import * as echarts from 'echarts';
import { CommandeDTO } from 'src/app/models/commande-dto';
import { CommandeService } from 'src/app/service/commande.service';
import { SuiviProdService } from 'src/app/service/suivi-prod.service';
import * as ApexCharts from 'apexcharts';






@Component({
  selector: 'app-charts-chartjs',
  templateUrl: './charts-chartjs.component.html',
  styleUrls: ['./charts-chartjs.component.css']
})
export class ChartsChartjsComponent implements OnInit {

  chart!: any;
  id!: number;
  periodesFabData: number[] = [];
  budgetChart: any;


  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private suiviProdService: SuiviProdService, private http: HttpClient) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.id = this.route.snapshot.params['id'];

    this.http.get<number>(`http://localhost:8080/api/v1/suivi/pourcentage-pieces-defaillantes/${this.id}`)
      .subscribe(pourcentage => {
        // Création du graphique à secteurs avec les données reçues
        const chartElement = document.querySelector("#budgetChart");
        if (chartElement instanceof HTMLElement) {
          // Création du graphique à secteurs avec les données reçues
          this.budgetChart = echarts.init(chartElement); //créer le graphique et le rendre visible.
          this.budgetChart.setOption({ // fournir les options de configuration du graphique
            tooltip: {
              trigger: 'item',//l'infobulle sera déclenché lorsque on survole un élément individuel du graphique à secteurs
              formatter: '{a} <br/>{b}: {c} ({d}%)' //(infobulle) montrer le nom de la série à laquelle appartient le secteur, 
              //le nom spécifique de l'élément survolé et sa valeur numérique 
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['Les pièces défaillantes', 'Les pièces sans aucun défaut']
            },
            series: [
              {
                name: 'Pièces défaillantes vs Pièces sans aucun défaut',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: pourcentage, name: 'Les pièces défaillantes' },
                  { value: 100 - pourcentage, name: 'Les pièces sans aucun défaut' }
                ]
              }
            ]
          });
        }
      });

    this.appelerAPI(this.id);

  }


  appelerAPI(ordreFabId: number) {
    this.suiviProdService.getPeriodesFab(ordreFabId).subscribe(
      data => {
        // Mise à jour des données du graphique
        this.periodesFabData = Object.values(data);

        // Appel à la méthode de rendu du graphique
        this.renderChart();
      },
      error => {
        // Gestion des erreurs
        console.error(error);
      }
    );
  }


  renderChart() {
    const lineChart = new ApexCharts(document.querySelector("#AlineChart"), {
      series: [{
        name: "Période de fabrication actuelle",
        data: [this.periodesFabData[0]] // Utiliser la période de fabrication actuelle comme données pour la première barre
      }, {
        name: "Période de fabrication prévue",
        data: [this.periodesFabData[1]] // Utiliser la période de fabrication prévue comme données pour la deuxième barre
      }],
      chart: {
        height: 340,
        type: 'bar',
        stacked: false, // Désactiver l'empilement des barres
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          horizontal: false, // Définir la direction des barres sur vertical (par défaut)
          columnWidth: '50%', // Définir la largeur des barres groupées
          endingShape: 'flat' // Définir la forme de fin des barres
          
        },
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['Périodes de fabrication'], // Modifier les étiquettes de l'axe des abscisses
      },
      legend: {
        position: 'top' // Modifier la position de la légende
      }
    });

    lineChart.render(); //afficher le graphique aprés l'avoir configuré
  }







}
















