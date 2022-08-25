const { request, response } = require('express');
const { UDIService } = require('../services/banxico.service');
const { Op } = require('sequelize');
const { getDayFromMoment, dateIntervals, formatData } = require('../helpers');
const moment = require('moment');
const UDI = require('../models/udi.model');

const udisCreate = async ( req = request, res = response) =>{
    
    try{

        const day = getDayFromMoment();

        if( day !== 25 && day !== 10 ){
            return res.status(200).json({
                msg: 'UDIs are alredy saved on BD',
            });
        }
        
        const { initPeriod, endPeriod } = dateIntervals( day ); 
        
        const udis = await UDI.findAll({ where: {
            fecha:{
                [Op.between] : [initPeriod, endPeriod]
            }
        }});

        if(udis.length !== 0){
            return res.status(200).json({
                msg: 'UDIs are alredy saved on BD',
            });
        }

        const response = await UDIService(initPeriod, endPeriod);

        const data = response?.data;
        const { bmx } = data;
        const { series } = bmx;

        const { datos } = series[0];

        const bulkData = formatData( datos );
        await UDI.bulkCreate( bulkData );
        

        res.status(201).json({
            msg: 'UDIS created succesfully',
        });
        
    }catch(error){
        
        console.error(error);
        res.status(500).json({
            status: 500,
            msg: 'Error con la aplicación, contacte al administrador',
        });
        
    }

}

const udisGet = async (req = request, res = response) =>{

    try{

        const { date } = req.params;
        
        if( !date ){
            return res.status(400).json({
                msg: 'No date provided'
            })
        }


        const udi = await UDI.findOne({ where: { fecha: moment(date,'YYYY-MM-DD')} });
        

        if(!udi){
            return res.status(404).json({
                msg:'UDI not found',
            })
        }

        res.status(200).json({
            msg: 'OK',
            data: udi,
        });

    }catch(e){

        console.error('Error in udis.controller.js file in udisGet ', e);
        res.status(500).json({
            status: 500,
            msg: 'Error con la aplicación, contacte al administrador',
        });
        
    }

}

module.exports = { udisCreate, udisGet }