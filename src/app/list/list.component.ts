import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Icon, IconFile } from '../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  error: string = null;
  original: Icon[] = [];
  icons: Icon[] = []; // filtered

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getFileList().subscribe(
      (data: Icon[]) => {
        this.original = data;
        this.copyData();
        this.original[0].category = 'Basic Icons';
        this.error = null;
      },
      (error) => {
        this.error = error;
      }
    );
  }

  public handleOnChangedFilter(data: string): void {
    // these are interface references not classes, so I don't understand why they won't deep copy... :-(
    this.copyData();
    if (data) {
      const tokens = data.split(' ');
      console.log(tokens);
      // reset the base for filtering
      console.log(this.original);  // this.original is being changed by the icons.forEach...!
      // for each Icon filter it's file list by displayname? 
      this.icons.forEach((icon: Icon) => {
        icon.files = icon.files.filter( (iconFile: IconFile) => {
            return iconFile.displayName.toLocaleLowerCase().includes(data.toLocaleLowerCase())
        })
      })
    }
  }

  private copyData(): void {
    this.icons = [];
    for (let index = 0; index < this.original.length; index++) {
      let icon: Icon = this.original[index];
      const newIcon: Icon = {...icon};
      newIcon.files = [];
      for (let fileIndex = 0; fileIndex < this.original[index].files.length; fileIndex++) {
        const file: IconFile = this.original[index].files[fileIndex];
        // so now we have an icon and a file
        const newFile : IconFile = {...file};
        newIcon.files.push(newFile);
      }
      this.icons.push(newIcon);
    }
  }

  public getImgUrl(category: string, counter: number): string {
    let result: string;
    const ClearNetURL = 'https://clearnetdesigns.co.uk/silverfox/icons/';
    const SadFace = 'img/basic/24px/large/emoticon-sad.png';
    const files: Icon[] = this.icons.filter(icon => icon.category === category);
    // files now contains all the file for the requested category. Now filter #2
    if (files.length !== 1) {
      result = 'https://clearnetdesigns.co.uk/silverfox/icons/img/basic/24px/large/emoticon-sad.png';
    }
    const file: IconFile[] = files[0].files.filter(afile => afile.counter === counter);
    if (file.length === 1) {
      result = `https://clearnetdesigns.co.uk/silverfox/icons/${file[0].fileName}`
    } else {
      result = 'https://clearnetdesigns.co.uk/silverfox/icons/img/basic/24px/large/emoticon-sad.png'
    }
    return result;
  }

}
