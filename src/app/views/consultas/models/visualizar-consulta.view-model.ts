import { ListarMedicoViewModel } from "../../medicos/models/listar-medico.view-model";

export type VisualizarConsultaViewModel = {
    id: string;
    titulo: string;
    horaInicio: Date;
    horaTermino: Date;
    medico: ListarMedicoViewModel;
}