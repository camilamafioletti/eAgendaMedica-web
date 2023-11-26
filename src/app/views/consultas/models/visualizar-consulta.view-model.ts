import { ListarMedicoViewModel } from "../../medicos/models/listar-medico.view-model";

export type VisualizarConsultaViewModel = {
    id: string;
    titulo: string;
    data: Date;
    horaInicio: Date;
    horaTermino: Date;
    medico: ListarMedicoViewModel;
}