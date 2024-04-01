import { Component } from '@angular/core';
import { Owners } from 'src/assets/owners';
// import InstagramIcon from '@mui/icons-material/Instagram';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  owners = new Owners();
  owner_details = this.owners.owners;
}
