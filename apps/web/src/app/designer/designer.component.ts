import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { produce } from 'immer';
import { EditingService } from '../editing.service';

@Component({
  selector: 'cas-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent implements OnInit {
  host = new BehaviorSubject<any>({
    type: 'cp.flex-container',
    props: {
      layout: 'column',
      align: 'center center',
      gap: '3rem',
      items: [
        {
          type: 'cp.flex-container',
          props: {
            layout: 'row',
            align: 'start center',
            gap: '1rem',
            items: [
              {
                type: 'debug.button',
                props: {
                  text: 'Submit'
                }
              },
              {
                type: 'mat.raised-button',
                props: {
                  items: [
                    {
                      type: 'mat.icon',
                      props: {
                        icon: 'home'
                      }
                    },
                    {
                      type: 'dom.text',
                      props: {
                        text: 'Home'
                      }
                    }
                  ]
                }
              },
              {
                type: 'mat.raised-button',
                props: {
                  items: [
                    {
                      type: 'cp.labelled-icon',
                      props: {
                        icon: 'person',
                        text: 'Profile'
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          type: 'debug.card',
          props: {
            title: [
              {
                type: 'dom.span',
                props: {
                  text: 'Beaver'
                }
              },
              {
                type: 'dom.span',
                props: {
                  text: ', Animal'
                }
              }
            ],
            subtitle: [
              {
                type: 'dom.span',
                props: {
                  text: 'Family: '
                }
              },
              {
                type: 'dom.span',
                props: {
                  text: 'Castoridae'
                }
              }
            ],
            content: [
              {
                type: 'dom.p',
                props: {
                  text: 'Beavers are large, semiaquatic rodents native to the temperate Northern Hemisphere...'
                }
              }
            ],
            actions: [
              {
                type: 'mat.button',
                props: {
                  items: [
                    {
                      type: 'dom.text',
                      props: {
                        text: 'Like'
                      }
                    }
                  ]
                }
              },
              {
                type: 'mat.button',
                props: {
                  items: [
                    {
                      type: 'dom.text',
                      props: {
                        text: 'Share'
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  });

  constructor(private editingService: EditingService) {}

  ngOnInit(): void {}

  insertComponent(item: any) {
    console.log('INSERT', item);
    const nextHost = produce(this.host.value, (draft) => {
      draft.props.items.push(item);
    });

    this.editingService.reset();
    this.host.next(nextHost);
  }
}
