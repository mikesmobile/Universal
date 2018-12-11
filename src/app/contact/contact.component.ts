import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { ServicesService } from '../services/service.service';
import { QuoteFormComponent } from '../quote-form/quote-form.component';
import { MouseEvent } from '@agm/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass'],
  providers: [ServicesService],
  animations: [
    trigger('infobox', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('clicked', style({
        backgroundColor: 'black',
        transition: 'opacity 3s ease-in-out',
        opacity: '0',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> clicked', animate(300)),
      // transition('clicked => normal', animate(800))
    ])
  ]
})
export class ContactComponent implements OnInit {
  @ViewChild(QuoteFormComponent) private quoteForm: QuoteFormComponent;
  toggleQuoteForm() {
    this.quoteForm.show()
  }
  state = 'clicked'
  clicked: string = 'none'
  //  center position of the map
  lat = 38.253401
  lng = -121.299688
  markers: marker[] = [
    {
      lat: 38.576830,
      lng: -121.324260,
      label: 'Sacramento',
      draggable: false
    },
    {
      lat: 38.023689,
      lng: -121.280342,
      label: 'Stockton',
      draggable: false
    },
  ]
  zoom: number = 9.7;
  scrollwheel = false;

  mapClicked($event: MouseEvent) {
    this.scrollwheel = true;
    this.clicked = 'none'
  };

  clickedMarker(label: string) {
    this.clicked = label
    this.state == 'normal' ? this.state = 'clicked' : this.state = 'normal';
    //console.log(this.clicked)
    //console.log(this.state)
 //   console.log(`clicked the marker: ${this.clicked}`)
  }


  toppings = new FormControl();
  toppingList = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  optionsSelect = []
  groupOptionsSelect = []
  emailForm: FormGroup

  constructor(private _service: ServicesService) { }


  ngOnInit() {
   //console.log(this.clicked)
   //console.log(this.state)
    this.emailForm = new FormGroup({
      'name': new FormControl("", [
        Validators.required,
        Validators.maxLength(100)
      ]),
      'city': new FormControl("", [
        Validators.required,
        Validators.maxLength(100)
      ]),
      'phone': new FormControl("", [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(15)
      ]),
      'email': new FormControl("", [
        Validators.required,
        Validators.maxLength(150)
      ]),
      'message': new FormControl("", [
        Validators.required,
        Validators.maxLength(280)
      ]),
      'option': new FormControl("", Validators.required)
    })

    this.groupOptionsSelect = [
      { value: '', label: 'DOOR AND WINDOW SCREENS', group: true },
      { value: '', label: 'SCREEN DOORS', group: true },
      { value: 'Retractable Screen Doors', label: 'Retractable Screen Doors' },
      { value: 'Sliding Screen Doors', label: 'Sliding Screen Doors' },
      { value: 'Swinging Screen Doors', label: 'Swinging Screen Doors' },
      { value: 'Pet Doors', label: 'Pet Doors' },
      { value: '', label: 'WINDOWS SCREENS', group: true },
      { value: 'Window Screen Repair', label: 'Window Screen Repair' },
      { value: 'Solar Screens', label: 'Solar Screens' },
      { value: '', label: 'CHIMNEY SERVICES', group: true },
      { value: 'Chimney Inspection', label: 'Chimney Inspection' },
      { value: 'Chimney Cleaning', label: 'Chimney Cleaning' },
      { value: 'Chimney Repair', label: 'Chimney Repair' },
      { value: 'Masonry Services', label: 'Masonry Services' },
      { value: 'Dryer Vent Cleaning', label: 'Dryer Vent Cleaning' },
      { value: '', label: 'SECURITY DOORS AND WINDOWS', group: true },
      { value: '', label: 'SECURITY DOORS', group: true },
      { value: 'Steel Security Doors', label: 'Steel Security Doors' },
      { value: 'Viewguard', label: 'Viewguard' },
      { value: 'Tru-View', label: 'Tru-View' },
      { value: 'Tru-Frame', label: 'Tru-Frame' },
      { value: 'Sliding Security Doors', label: 'Sliding Security Doors' },
      { value: '', label: 'SECURITY WINDOWS', group: true },
      { value: 'CRL Guarda Quick Escape', label: 'CRL Guarda Quick Escape' },
      { value: 'CRL Guarda Fixed', label: 'CRL Guarda Fixed' },
      //{ value: 'CRL Guarda Casement', label: 'CRL Guarda Casement' },
      { value: '', label: 'AWNINGS', group: true },
      { value: 'Retractable Patio Awnings', label: 'Retractable Patio Awnings' },
      { value: 'Drop Roll Sunscreens', label: 'Drop Roll Sunscreens' },

    ];

    //    this.growActionBtns();

    if (screen.width < 992) {
      if (document.getElementById('desktop-only'))
        document.getElementById('desktop-only').style.display = "none";
    }
  }

  get name() {
    return this.emailForm.get("name")
  }
  get city() {
    return this.emailForm.get("city")
  }
  get phone() {
    return this.emailForm.get("phone")
  }
  get email() {
    return this.emailForm.get("email")
  }
  get message() {
    return this.emailForm.get("message")
  }
  get option() {
    return this.emailForm.get("option")
  }

  handleSubmit(event: any, emailDir: NgForm, emailForm: FormGroup) {
    event.preventDefault()
    if (emailDir.submitted) {
      //console.log(emailForm.value)
      let name = emailForm.value['name']
      let city = emailForm.value['city']
      let phone = emailForm.value['phone']
      let email = emailForm.value['email']
      let message = emailForm.value['message']
      let option = emailForm.value['option']
      this._service.create(name, city, phone, email, message, option).subscribe(data => {
        //console.log(data)
      })
      emailDir.resetForm({})
    }

  }

  hideShowSearch() {
    var searchInput = document.getElementById('search-input');

    document.getElementById('search-button').classList.toggle("orange");

    if (searchInput.style.display === "none") {
      searchInput.style.display = "inline";
      searchInput.style.width = "100%";
    } else {
      searchInput.style.display = "none"
    }

  }

  growActionBtns() {
    if (screen.width < 992) {
      var container = document.getElementById('action-buttons-container');
      container.classList.remove('container', 'mt-3');
      container.classList.add('row');
    }
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}