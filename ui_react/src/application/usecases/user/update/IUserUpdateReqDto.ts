export default interface IUserUpdateReqDto {
    id: number | undefined;
    tipo_usuario: number | undefined;
    nombre_completo: string | undefined;
    username: string | undefined;
    password: string | undefined;
    fecha_alta: string | undefined;
}