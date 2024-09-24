import {Component,AfterViewInit, ViewChild, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AffectationService} from "../../../service/affectation.service";
import {Affectation} from "../../../model/affectation";
import {User} from "../../../model/user";
import {AuthService} from "../../../service/auth.service";
import * as $ from 'jquery';
import 'datatables.net'; // DataTables core
import 'datatables.net-bs5'; // DataTables Bootstrap 5
// import 'datatables.net-responsive'; // DataTables Responsive extension
// import 'datatables.net-buttons'; // DataTables buttons extension
// import 'select2'; // Select2 for custom selects

@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.css']
})
export class ListAffectationComponent implements OnInit, AfterViewInit {
  // campus
  affectation :any = [];
  // salles
  affectationS: any= [];
  // users
  affectationU :any = [];
  user: User | null = null;

  ngOnInit(): void {
    this.getAllAffectationForNT();
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {

      }
    });
  }


// Use ngAfterViewInit to ensure the DOM is fully loaded
  ngAfterViewInit(): void {
    //______Basic Data Table
    $('#basic-datatable').DataTable({
      language: {
        searchPlaceholder: 'Search...',
        //@ts-ignore
        sSearch: ''
      }
    });

    //______Responsive Data Table
    $('#responsive-datatable').DataTable({
      language: {
        searchPlaceholder: 'Search...',
        //@ts-ignore
        scrollX: "100%",
        sSearch: ''
      }
    });

    //______File-Export Data Table with Buttons
    const fileTable = $('#file-datatable').DataTable({
      buttons: ['copy', 'excel', 'pdf', 'colvis'],
      language: {
        searchPlaceholder: 'Search...',
        //@ts-ignore
        scrollX: "100%",
        sSearch: ''
      }
    });
    //@ts-ignore
    fileTable.buttons().container()
      .appendTo('#file-datatable_wrapper .col-md-6:eq(0)');

    //______Delete Data Table
    const deleteTable = $('#delete-datatable').DataTable({
      language: {
        searchPlaceholder: 'Search...',
        //@ts-ignore
        sSearch: ''
      }
    });
    $('#delete-datatable tbody').on('click', 'tr', function() {
      if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
      } else {
        deleteTable.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
      }
    });
    $('#button').on('click', function() {
      deleteTable.row('.selected').remove().draw(false);
    });

    //______Example 3 with Modal
    // @ts-ignore
    $('#example3').DataTable({
      //@ts-ignore
      responsive: {
        details: {
          //@ts-ignore
          display: $.fn.dataTable.Responsive.display.modal({
            //@ts-ignore
            header: function(row) {
              const data = row.data();
              return 'Details for ' + data[0] + ' ' + data[1];
            }
          }),
          //@ts-ignore
          renderer: $.fn.dataTable.Responsive.renderer.tableAll({
            tableClass: 'table'
          })
        }
      }
    });

    //______Example 2 Responsive
    $('#example2').DataTable({
      responsive: true,
      language: {
        searchPlaceholder: 'Search...',
        //@ts-ignore
        sSearch: '',
        lengthMenu: '_MENU_ items/page'
      }
    });

    //______Select2 for custom selects
    //@ts-ignore
    $('.select2').select2({
      minimumResultsForSearch: Infinity
    });
  }

  constructor(private authService:AuthService,private router: Router,private affectationService:AffectationService) {
  }



  goToAdd(){
    this.router.navigate(['/admin/affectation']);
  }
  getAllAffectationForNT(){
     this.affectationService.getAffectationFNT('campuses').subscribe(res =>
    {
      this.affectation= res;
      console.log(this.affectation);
    });
     this.affectationService.getAffectationFNT('salles').subscribe(res =>
    {
      this.affectationS= res;
      console.log(this.affectationS);
    });
     this.affectationService.getAffectationFNT('users').subscribe(res =>
    {
      this.affectationU= res;
      console.log(this.affectationU);
    });

  }

  goToTransfert(id:any){
    this.router.navigate(['/admin/transfert-materiels/',id]);
  }


}
