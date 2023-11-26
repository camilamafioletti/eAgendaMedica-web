import { VisualizarMedicoViewModel } from "../../medicos/models/visualizar-medico.view-model";

export type FormsConsultaViewModel = {
    titulo: string;
    data: Date;
    horaInicio: Date;
    horaTermino: Date;
    medicoId: VisualizarMedicoViewModel;
}