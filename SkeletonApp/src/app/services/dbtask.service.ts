import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { SesionData } from './sesion-data';

@Injectable({
  providedIn: 'root'
})
export class DBTaskService {
  //variable para manipular la conexion a la base de datos
  public database!: SQLiteObject;
  //variable para la sentencia de creacion de tabla
  tablaSesionData: string = "CREATE TABLE IF NOT EXISTS sesion_data(user_name VARCHAR(8) PRIMARY KEY NOT NULL, password INTEGER NOT NULL, active INTEGER NOT NULL);";
  //variable para la sentencia de registros por defecto en la tabla
  registroSesionData: string = "INSERT OR IGNORE INTO sesion_data(user_name, password, active) VALUES('test', 1234, 0);";
  //observable para manipular todos los registros de la tabla sesion_data
  listaSesionData = new BehaviorSubject([]);
  //observable para manipular si la BD esta lista o no para su manipulacion
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) { 
    this.crearBD();
  }

  crearBD(){
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'bdsesiondata.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardamos la conexion a la BD en la variable propia
        this.database = db;
        //llamar a la funcion para crear tablas
        this.crearTablas();
      }).catch(e => {
        //muestro el mensaje de error en caso de ocurrir alguno
        this.presentToast("Error BD:" + e);
      })
    })
  }

  async crearTablas(){
    try{
      //ejecuto mis tablas
      await this.database.executeSql(this.tablaSesionData, []);
      //ejecuto mis registros
      await this.database.executeSql(this.registroSesionData, []);
      //cargar todos los registro de la tabla en el observable
      this.buscarSesionData();
      //actualizar el status de la BD
      this.isDBReady.next(true);
    } catch( e ){
      this.presentToast("Error tablas:"+e);
    }
  }
  
  buscarSesionData(){
    //retorno la ejecucion del select
    return this.database.executeSql('SELECT * FROM sesion_data', []).then(res=>{
      //creo mi lista de objetos de sesion_data vacio
      let items: SesionData[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros a items
      if(res.rows.lenght > 0){
        for(var i = 0; i < res.rows.lenght; i++){
          items.push({
            user_name: res.rows.item(i).user_name,
            password: res.rows.item(i).password,
            active: res.rows.item(i).active
          });
        }
      }
      //actualizamos el observable de sesion_data
      this.listaSesionData.next(items as any);
    });
  }

  dbState(){
    return this.isDBReady.asObservable();
  }

  fetchSesionData(): Observable<SesionData[]>{
    return this.listaSesionData.asObservable();

  }

  insertarSesionData(user_name: any, password: any){
    let data = [user_name, password];
    return this.database.executeSql('INSERT INTO sesion_data VALUES (?, ?, 0)', data).then(res=>{
      this.buscarSesionData();
    });
  }

  modificarSesionDataActive(user_name: any, active: any){
    let data = [active, user_name];
    return this.database.executeSql('UPDATE sesion_data SET active = ?, WHERE user_name = ?', data).then(res=>{
      this.buscarSesionData();
    })
  }

  modificarSesionDataPassword(user_name: any, password: any){
    let data = [password, user_name];
    return this.database.executeSql('UPDATE sesion_data SET password = ?, WHERE user_name = ?', data).then(res=>{
      this.buscarSesionData();
    })
  }

  eliminarSesionData(user_name: any){
    return this.database.executeSql('DELETE FROM sesion_data WHERE user_name = ?', [user_name]).then(a=>{
      this.buscarSesionData();
    })
  }

  async presentToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje,
      duration:3000
    });
    toast.present();
  }
}
