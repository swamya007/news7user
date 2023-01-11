import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/services/categoryservice/category-service.service';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit {

  currentuser: any = {}
  catarr: any = []
  data:any = []
  cat_id_arr:any = []
  selected:any = []

  constructor(private categoryService: CategoryServiceService, private loginservice: LoginService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.currentuser = this.loginservice.getCurrentUser();
    this.getCategory();
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  getCategory() {
    this.categoryService.getCategory(this.currentuser.customer_id).subscribe((res: any) => {
      if (res.code == 'success') {
        var data = res.body;
        this.catarr = data.map((dt: any) => JSON.parse(dt));
        this.editData()
      } else {
        this.catarr = []
      }
    }, (err) => {
      this.catarr = []
    })
  }

  view() {
    if(this.data.length > 0) {
      this.cat_id_arr = this.data.map((x: any) => x.key);
      console.log(this.cat_id_arr);
      
    }
  }

  currentItem: any;

  selectedItem(item: any) {
    this.currentItem = item;
  }

  checkedItems(items: any) {
    this.data = items.checked;
  }

  editData() {
    this.catarr = [
      {
        "key": 29,
        "name": "Automobile",
        "checked": true,
        "children": null
      },
      {
        "key": 31,
        "name": "Blog",
        "checked": false,
        "children": null
      },
      {
        "key": 22,
        "name": "Business",
        "checked": false,
        "children": null
      },
      {
        "key": 37,
        "name": "Campus Muse",
        "checked": false,
        "children": null
      },
      {
        "key": 24,
        "name": "Crime",
        "checked": false,
        "children": [
          {
            "key": 43,
            "name": "Thrill",
            "checked": true,
            "children": null
          }
        ]
      },
      {
        "key": 42,
        "name": "Economy",
        "checked": false,
        "children": null
      },
      {
        "key": 27,
        "name": "Education",
        "checked": false,
        "children": null
      },
      {
        "key": 21,
        "name": "Entertainment",
        "checked": false,
        "children": [
          {
            "key": 52,
            "name": "Bollywood",
            "checked": false,
            "children": null
          },
          {
            "key": 50,
            "name": "Kollywood",
            "checked": false,
            "children": null
          },
          {
            "key": 46,
            "name": "Ollywood",
            "checked": false,
            "children": null
          },
          {
            "key": 48,
            "name": "Tollywood",
            "checked": false,
            "children": null
          }
        ]
      },
      {
        "key": 30,
        "name": "Health",
        "checked": false,
        "children": [
          {
            "key": 44,
            "name": "Covid 19",
            "checked": false,
            "children": null
          },
          {
            "key": 64,
            "name": "Dengue",
            "checked": false,
            "children": null
          }
        ]
      },
      {
        "key": 28,
        "name": "Nation",
        "checked": false,
        "children": [
          {
            "key": 45,
            "name": "National",
            "checked": false,
            "children": null
          }
        ]
      },
      {
        "key": 35,
        "name": "None",
        "checked": false,
        "children": null
      },
      {
        "key": 36,
        "name": "Odisha",
        "checked": false,
        "children": [
          {
            "key": 63,
            "name": "Berhampur",
            "checked": false,
            "children": null
          },
          {
            "key": 53,
            "name": "Bhubaneswar",
            "checked": false,
            "children": null
          },
          {
            "key": 60,
            "name": "Cuttack",
            "checked": false,
            "children": null
          },
          {
            "key": 62,
            "name": "Jajpur",
            "checked": false,
            "children": null
          },
          {
            "key": 61,
            "name": "Puri",
            "checked": false,
            "children": null
          },
          {
            "key": 34,
            "name": "Twin City",
            "checked": false,
            "children": null
          }
        ]
      },
      {
        "key": 25,
        "name": "Politics",
        "checked": false,
        "children": [
          {
            "key": 86,
            "name": "Nation Politics",
            "checked": false,
            "children": null
          },
          {
            "key": 108,
            "name": "State Politics",
            "checked": false,
            "children": null
          }
        ]
      },
      {
        "key": 33,
        "name": "Science",
        "checked": false,
        "children": null
      },
      {
        "key": 26,
        "name": "Sports",
        "checked": false,
        "children": [
          {
            "key": 55,
            "name": "Cricket",
            "checked": false,
            "children": null
          },
          {
            "key": 57,
            "name": "Football",
            "checked": false,
            "children": null
          },
          {
            "key": 54,
            "name": "Hockey",
            "checked": false,
            "children": null
          },
          {
            "key": 59,
            "name": "Kabadi",
            "checked": false,
            "children": null
          }
        ]
      },
      {
        "key": 23,
        "name": "Technology",
        "checked": false,
        "children": null
      },
      {
        "key": 109,
        "name": "Top News",
        "checked": false,
        "children": null
      },
      {
        "key": 32,
        "name": "Women",
        "checked": false,
        "children": null
      }
    ];
    this.cdr.detectChanges();
    const a:any = []
    this.catarr.forEach((d:any) => {
      a.push({key:d.key,name:d.name,checked:d.checked})
      if(d.children) {
        d.children.forEach((p:any) => {
          a.push({key:p.key,name:p.name,checked:p.checked})
        })
      }
    })
    this.data = a.filter((f:any)=> f.checked == true)
  }
}
