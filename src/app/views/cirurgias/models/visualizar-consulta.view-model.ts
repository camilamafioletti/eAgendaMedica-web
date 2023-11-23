import { ListarMedicoViewModel } from "../../medicos/models/listar-medico.view-model";

export type VisualizarCirurgiaViewModel = {
    id: string;
    titulo: string;
    horaInicio: string;
    horaTermino: string;
    medicos: ListarMedicoViewModel[];
}