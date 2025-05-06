import { auth } from '../libs/firebase.js';

// Lista de correos electrónicos de los administradores
const adminEmails = [
    'correo1@ejemplo.com',
    'correo2@ejemplo.com',
    // Agrega los correos de tus compañeros aquí
];

async function setAdminPermissions() {
    try {
        for (const email of adminEmails) {
            const user = await auth.getUserByEmail(email);
            await auth.setCustomUserClaims(user.uid, { admin: true });
            console.log(`Permisos de administrador asignados a: ${email}`);
        }
        console.log('¡Todos los permisos han sido asignados!');
        process.exit(0);
    } catch (error) {
        console.error('Error al asignar permisos:', error);
        process.exit(1);
    }
}

setAdminPermissions(); 