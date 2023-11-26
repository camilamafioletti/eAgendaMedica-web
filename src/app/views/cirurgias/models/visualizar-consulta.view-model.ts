import { ListarMedicoViewModel } from "../../medicos/models/listar-medico.view-model";

export type VisualizarCirurgiaViewModel = {
    id: string;
    titulo: string;
    data: Date;
    horaInicio: Date;
    horaTermino: Date;
    medicos: ListarMedicoViewModel[];
}