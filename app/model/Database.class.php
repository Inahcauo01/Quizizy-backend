<?php

class Database{
    private $host=DB_HOST;
    private $name=DB_NAME;
    private $user=DB_USER;
    private $password=DB_PASSWORD;

    private $pdo;
    private $stmt;
    
    public function __construct()
    {
        $dsn='mysql:host='.$this->host.';dbname='.$this->name;
        try{
           $this->pdo=new PDO($dsn,$this->user,$this->password);
        }catch(PDOException $e){
            echo "Erreur de connexion".$e->getMessage();
        }
    }

    public function __destruct()
    {
        if($this->stmt !== null){
            $this->stmt=null;
        }
        if($this->pdo!==null){
            $this->pdo=null;
        }
    }
    public function getRow($query,$param=[])
    {
        try {
            $sqlstatment = $this->pdo->prepare($query);
            $sqlstatment->execute($param);
            return $sqlstatment->fetch();
        } catch (PDOException $e) {
            "Erreur" . $e->getMessage();
        }
    }
    public function numberRow($sql,$param=[]){
      $statment=$this->pdo->prepare($sql);
      $statment->execute($param);
      return $statment->rowCount();
    }
    public function totalRow($sql){
        $statment=$this->pdo->prepare($sql);
        $statment->execute();
        return $statment->rowCount();
    }
    // fetch All row 
    public function getAllrows($query)
    {  
        try {
            $sqlstatment = $this->pdo->prepare($query);
            $sqlstatment->execute();
            return $sqlstatment->fetchAll(PDO:: FETCH_ASSOC);
        } catch (PDOException $e) {
            "Erreur" . $e->getMessage();
        }
    }
    public function getAlrows($query,$param)
    {  
        try {
            $sqlstatment = $this->pdo->prepare($query,$param);
            $sqlstatment->execute($param);
            return $sqlstatment->fetchAll(PDO:: FETCH_ASSOC);
        } catch (PDOException $e) {
            "Erreur" . $e->getMessage();
        }
    }
    // insert function  
    public function insertData($query,$param=[])
    {
        try {
            $sqlstatment = $this->pdo->prepare($query);
            $sqlstatment->execute($param);
        } catch (PDOException $e) {
            "Erreur" . $e->getMessage();
        }
    }
    // update function
    public function updateData($query, $param = [])
    {
        try{
           $sqlstatment=$this->pdo->prepare($query);
           $sqlstatment->execute($param);
        }catch(PDOException $e){
           "Erreur".$e->getMessage();
        }
    }
    // delete function 
    public function deleteData($query, $param = [])
    {
        try{
           $sqlstatment=$this->pdo->prepare($query);
           $sqlstatment->execute($param);
        }catch(PDOException $e){
            "Erreur".$e->getMessage();
        }
    }



}











?>