import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { data } from 'jquery';
import { ClientCommandeCountDTO } from 'src/app/models/client-commande-count-dto';
import { Commande } from 'src/app/models/commande';
import { CommandeDTO } from 'src/app/models/commande-dto';
import { Rendement } from 'src/app/models/rendement';
import { ClientService } from 'src/app/service/client.service';
import { CommandeService } from 'src/app/service/commande.service';
import { RendementService } from 'src/app/service/rendement.service';
import { StorageService } from 'src/app/service/storage.service';
import * as echarts from 'echarts';
import { ArticleService } from 'src/app/service/article.service';

declare var ApexCharts: any; 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  isLoggedIn = false;
  roles: string[] = [];
  articles: string[] = [];
  nombreCommandesEtatZero!: number;
  nombreCommandesEtatUn!: number;
 pourcentageCommandesEtatUn!: number;
 pourcentageCommandesEtatZero!: number;
 mostOrderedArticleLabel: string = '';
 mostOrderedArticleCount!: number;
 rendements!: Rendement[];
 chart!: any;
 clientCommandeCountList!: ClientCommandeCountDTO[];
 topArticleLabels!: string[];
 firstItem!: string | null;
 
 



  constructor(private elementRef: ElementRef,private storageService: StorageService,private commandeService: CommandeService,private rendementService: RendementService,private clientService: ClientService,private articleService: ArticleService) {
   }

   

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }

    this.isLoggedIn = this.storageService.isLoggedIn();
    this.getNombreCommandesEtatZero();
    this.getNombreCommandesEtatUn();
    this.getPourcentageCommandesEtatUn();
    this.getPourcentageCommandesEtatZero();
    this.getMostOrderedArticleLabel();
    this.getMostOrderedArticleCount();
    this.getRendements();
    this.getTopArticles();

    this.commandeService.getCommandesDTO().subscribe(data => {
      const labels = data.map(commande => commande.dateLivraison);
      const joursRestants = data.map(commande => commande.joursRestants);
      console.log(data);
      
      const seriesData = data.map(commande => ({
        name: commande.reference, // Utilisez la référence de la commande comme nom de la série
        data: [[commande.dateLivraison, commande.joursRestants]] // Utilisez un tableau avec une seule paire [dateLivraison, joursRestants]
      }));
      // Utiliser les données pour créer votre graphique ApexCharts
      this.chart = new ApexCharts(document.querySelector("#reportsChart"), {
        series: seriesData,
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: true
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
            endingShape: 'rounded',
            dataLabels: {
              position: 'top' // Affiche les étiquettes de données au-dessus des barres
            }
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: 'MMM',
              day: 'dd',
              hour: 'HH',
              minute: 'mm'
            }
          }
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        }
      });
      // Rendre le graphique
      this.chart.render();
    }, error => {
      console.error('Une erreur s\'est produite lors de la récupération des données de l\'API :', error);
      console.log(error)
    });

    this.clientService.getClientCommandeCount().subscribe(data => {
      const chartData = data.map(item => ({ value: item.commandeCount, name: item.raisonSociale }));

      const trafficChart = echarts.init(document.querySelector("#trafficChart")!);
      trafficChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [{
          name: 'Nombre de commande par clients',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: chartData
        }]
      });
    });
    
  }

  getTopArticles() {
    this.articleService.getTopArticles().subscribe(
      response => {
        this.articles = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getNombreCommandesEtatZero(): void {
    this.commandeService.getNombreCommandesEtatZero()
      .subscribe(nombreCommandes => {
        this.nombreCommandesEtatZero = nombreCommandes;
      });
  }

  getNombreCommandesEtatUn(): void {
    this.commandeService.getNombreCommandesEtatUn()
      .subscribe(nombreCommandes => {
        this.nombreCommandesEtatUn = nombreCommandes;
      });
  }

  getPourcentageCommandesEtatUn(): void {
    this.commandeService.getPourcentageCommandesEtatUn().subscribe(
      (pourcentage: number) => {
        this.pourcentageCommandesEtatUn = pourcentage;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du pourcentage : ', error);
      }
    );
  }

  getPourcentageCommandesEtatZero(): void {
    this.commandeService.getPourcentageCommandesEtatZero().subscribe(
      (pourcentage: number) => {
        this.pourcentageCommandesEtatZero = pourcentage;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du pourcentage : ', error);
      }
    );
  }

  getMostOrderedArticleLabel() {
    this.commandeService.getMostOrderedArticleLabel().subscribe(
      (response: any) => {
        this.mostOrderedArticleLabel = response; // Assign the response directly
      },
      (error) => {
        console.log('Error retrieving the most ordered article:', error);
      }
    );
  }

  getMostOrderedArticleCount(): void {
    this.commandeService.getMostOrderedArticleCount().subscribe(
      (count: number) => {
        this.mostOrderedArticleCount = count;
      },
      (error) => {
        console.log('Error retrieving the most ordered article count:', error);
      }
    );
  }

  getRendements (){
    this.rendementService.getRendementList().subscribe(data=>{
      this.rendements=data;
    });

}









  
}






