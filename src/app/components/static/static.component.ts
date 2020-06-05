import { Component, ViewChild, OnChanges } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { FormGroup, FormArray } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ParsingService } from 'src/app/services/parsing.service';
import { highlight } from 'src/app/helpers/helpers';

export interface PanelType {
  icon?: string;
  title?: string;
  fields?: FormlyFieldConfig[];
}

@Component({
  selector: 'app-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss']
})
export class StaticComponent implements OnChanges {

  // accordion
  @ViewChild(MatAccordion) accordion: MatAccordion;
  step: number = 0;
  setStep(index: number) { this.step = index }
  nextStep() { this.step++ }
  prevStep() { this.step-- }

  // formly
  model: any = {};
  panels: PanelType[] = [];
  form: FormArray = new FormArray(this.panels.map(() => new FormGroup({})));
  options = this.panels.map(() => <FormlyFormOptions>{});
  panelIcons = {
    'Entrada y salida del paciente': 'airport_shuttle',
    'Diagnóstico': 'local_hospital',
    'Procedimientos': 'healing',
    'Tratamientos': 'local_pharmacy',
    'Pruebas y escalas de valoración': 'analytics',
  };

  constructor(
    private parser: ParsingService,
    ) {
    this.panels = this.getPanels();
  }

  ngOnChanges(): void {
    // this.model= autofill(_, _);
  }

  reset(): void {
    if (confirm('Estás a punto de restablecer el formulario a su estado inicial, perdiendo todo el progreso hasta ahora.')) {
      this.ngOnChanges();
    }
  }

  download() {
    alert(JSON.stringify(this.model));
  }

  getPanels(): PanelType[] {
    return [
      {
        icon: 'airport_shuttle',
        title: 'Entrada y salida del paciente',
        fields: [
          {
            template: `<p><b>Inicio de los síntomas</b></p>`
          },
          {
            key: 'fechaInicioSintomas',
            type: 'input',
            templateOptions: {
              type: 'date',
              appearance: 'outline',
              label: 'Fecha',
              // multiple: variable.cardinality === 'n',
              // options: options,
              focus: (field, event) => highlight(this.parser.annotations, 'context'),
              // addonRight: {
              //   icon: 'search',
              //   tooltip: suggestions.map(s => s.evidence).join('\n'),
              //   tooltipClass: 'multiline-tooltip',
              //   onClick: (to, addon, event) => highlight(to.suggestions, 'context'),
              // }
            }
          },
          {
            key: 'horaInicioSintomas',
            type: 'input',
            templateOptions: {
              type: 'time',
              appearance: 'outline',
              label: 'Hora',
              // multiple: variable.cardinality === 'n',
              // options: options,
              focus: (field, event) => highlight(this.parser.annotations, 'context'),
              // addonRight: {
              //   icon: 'search',
              //   tooltip: suggestions.map(s => s.evidence).join('\n'),
              //   tooltipClass: 'multiline-tooltip',
              //   onClick: (to, addon, event) => highlight(to.suggestions, 'context'),
              // }
            }
          },
        ]
      },
      {
        icon: 'local_hospital',
        title: 'Diagnóstico',
        fields: [
          {
            template: `<p><b>Diagnóstico principal</b></p>`
          },
          {
            key: 'diagnosticoPrincipal',
            type: 'select',
            templateOptions: {
              appearance: 'outline',
              label: 'Diagnóstico principal',
              options: [
                { label: 'ictus', value: 'ictus' },
                { label: 'ataque', value: 'ataque' },
                { label: 'hemorragia', value: 'hemorragia' },
              ],
              focus: (field, event) => highlight(this.parser.annotations, 'context'),
            }
          },
          {
            key: 'arteriaAfectada',
            type: 'select',
            templateOptions: {
              appearance: 'outline',
              label: 'Arteria afectada',
              options: [
                { label: 'ACM', value: 'ACM' },
                { label: 'PMI', value: 'PMI' },
                { label: 'ACA', value: 'ACA' },
              ],
              multiple: true,
              focus: (field, event) => highlight(this.parser.annotations, 'context'),
            }
          },


        ]
      },


    ];
  }

  // reactive form
  // form = this.fb.group({
  //   fechaInicioSintomas: [''],
  //   horaInicioSintomas: [''],
  //   fechaLlegadaHospital: [''],
  //   horaLlegadaHospital: [''],
  //   fechaIngreso: [''],
  //   fechaAlta: [''],
  //   horaAlta: [''],
  //   diagnosticoPrincipal: [''],
  //   arteriasAfectadas: [[]],
  //   localizaciones: [[]],
  //   lateralizacion: [''],
  //   etiologia: [''],
  //   fechaTrombolisisIntravenosa: [''],
  //   horaInicioPrimerBolusTrombolisisRtpa: [''],
  //   fechaTrombolisisIntraarterial: [''],
  //   horaTrombolisisIntraarterial: [''],
  //   fechaInicioTrombectomia: [''],
  //   horaInicioTrombectomia: [''],
  //   tiempoPuertaPuncion: [''],
  //   fechaPrimeraSerieTrombectomia: [''],
  //   horaPrimeraSerieTrombectomia: [''],
  //   fechaRecanalizacion: [''],
  //   horaRecanalizacion: [''],
  //   fechaFinTrombectomia: [''],
  //   horaFinTrombectomia: [''],
  //   tratamientosAntiagregantesHabituales: [[]],
  //   tratamientosAntiagregantesAlta: [[]],
  //   tratamientosAnticoagulantesHabituales: [[]],
  //   tratamientosAnticoagulantesAlta: [[]],
  //   fechaTac: [''],
  //   horaTac: [''],
  //   aspects: [''],
  //   mRankinPrevia: [''],
  //   mRankinAlta: [''],
  //   nihssPrevia: [''],
  //   nihssAlta: [''],
  // });

  // options = {
  //   diagnosticoPrincipal: [
  //     { value: 'ictus isquémico' },
  //     { value: 'ataque isquémico transitorio' },
  //     { value: 'hemorragia cerebral' },
  //   ],
  //   arteriasAfectadas: [
  //     { value: 'arteria 1' },
  //     { value: 'arteria 2' },
  //     { value: 'arteria 3' },
  //   ],
  //   localizaciones: [
  //     { value: 'taci' },
  //     { value: 'paci' },
  //     { value: 'laci' },
  //     { value: 'poci' },
  //   ],
  //   lateralizacion: [
  //     { value: 'izq' },
  //     { value: 'der' },
  //     { value: 'ambas' },
  //     { value: 'indeterm' },
  //   ],
  //   etiologia: [
  //     { value: 'atero', comment: 'isquémico' },
  //     { value: 'cardio', comment: 'isquémico' },
  //     { value: 'lacunar', comment: 'isquémico' },
  //     { value: 'hiperten', comment: 'hemorragia' },
  //     { value: 'secund', comment: 'hemorragia' },
  //   ],
  //   tratamientoAnticoagulante: [
  //     { value: 'acenocumarol', comment: 'sintrom' },
  //     { value: 'warfarin', comment: 'aldocumar' },
  //     { value: 'heparin', comment: 'heparina' },
  //   ],
  //   tratamientoAntiagregante: [
  //     { value: 'clopidogrel', comment: 'plavix' },
  //     { value: 'ticlopidine', comment: 'tiklid' },
  //     { value: 'acetylsalicylic acid', comment: 'AAS, adiro, aspirina' },
  //   ],
  // }

  // getEtiologiaOptions() {
  //   if (this.form.value.diagnosticoPrincipal.match('isquémico')) {
  //     return this.options.etiologia.filter(o => o.comment === 'isquémico');
  //   }
  //   if (this.form.value.diagnosticoPrincipal.match('hemorragia')) {
  //     return this.options.etiologia.filter(o => o.comment === 'hemorragia');
  //   }
  // }

  // constructor(private fb: FormBuilder) { }

  // ngOnInit(): void {
  //   this.form.patchValue({
  //     fechaInicioSintomas: '1999-12-31',
  //     nihssAlta: 5,
  //   });
  // }

  // form = this.fb.group({
  //   entradaSalidaPaciente: this.fb.group({
  //     inicioSintomas: this.fb.group({
  //       fecha: [''],
  //       hora: [''],
  //     }),
  //     llegadaAlHospital: this.fb.group({
  //       fecha: [''],
  //       hora: [''],
  //     }),
  //     ingreso: this.fb.group({
  //       fecha: [''],
  //     }),
  //     alta: this.fb.group({
  //       fecha: [''],
  //       hora: [''],
  //     }),
  //   }),
  //   diagnostico: this.fb.group({
  //     diagnosticoPrincipal: [''],
  //     arteriasAfectadas: [''],
  //     localizaciones: [''],
  //     lateralizacion: [''],
  //     etiologia: [''],
  //   }),
  //   procedimientos: this.fb.group({
  //     trombolisis: this.fb.group({
  //       intravenosa: this.fb.group({
  //         fecha: [''],
  //         hora: [''],
  //       }),
  //       intraarterial: this.fb.group({
  //         fecha: [''],
  //         hora: [''],
  //       }),
  //     }),
  //     trombectomiaMecanica: this.fb.group({
  //       inicio: this.fb.group({
  //         fecha: [''],
  //         hora: [''],
  //         tiempoPuertaPuncion: [''],
  //       }),
  //       primeraSerie: this.fb.group({
  //         fecha: [''],
  //         hora: [''],
  //       }),
  //       recanalizacion: this.fb.group({
  //         fecha: [''],
  //         hora: [''],
  //       }),
  //       finalizacion: this.fb.group({
  //         fecha: [''],
  //         hora: [''],
  //       }),
  //     }),
  //   }),
  //   tratamientos: this.fb.group({
  //     antiagregantes: this.fb.group({
  //       habituales: [''],
  //       alAlta: [''],
  //     }),
  //     anticoagulantes: this.fb.group({
  //       habituales: [''],
  //       alAlta: [''],
  //     }),
  //   }),
  //   pruebas: this.fb.group({
  //     tacCraneal: this.fb.group({
  //       fecha: [''],
  //       hora: [''],
  //     })
  //   }),
  //   escalas: this.fb.group({
  //     aspects: [''],
  //     mRankin: this.fb.group({
  //       previa: [''],
  //       alAlta: [''],
  //     }),
  //     nihss: this.fb.group({
  //       previa: [''],
  //       alAlta: [''],
  //     }),
  //   }),
  // });

}
