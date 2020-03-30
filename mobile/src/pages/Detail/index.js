import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {  Text, View, TouchableOpacity,  Image, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';


import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato sobre o caso ${incident.title}, gostaria de ajudar com o valor ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' } ).format(incident.value)}`;

    function navigateBack(){
        navigation.goBack();
    }
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        });
    }
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
             <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={ [styles.incidentProperty, { marginTop: 0 } ] }>ONG</Text>
                <Text style={ styles.incidentValue}>
                        {incident.name} de {incident.city}/{incident.uf}
                </Text>

                <Text style={ styles.incidentProperty}>Caso</Text>
                <Text style={ styles.incidentValue}>{incident.description}</Text>

                <Text style={ styles.incidentProperty}>Valor:</Text>
                <Text style={ styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR', 
                                                { 
                                                    style: 'currency', 
                                                    currency: 'BRL'
                                                } 
                                                ).format(incident.value)
                        }
                </Text>

            </View>
            <View style={styles.contactBox}>
                <Text style={ styles.heroTitle}>Salve o dia!</Text> 
                <Text style={ styles.heroTitle}>Seja o heroi desse caso.</Text> 
                
                <Text style={ styles.heroDescription}>Entre em contato:</Text> 
                
                <View style={styles.actions}>
                    <TouchableOpacity 
                        onPress={sendWhatsapp}
                        style={styles.action} >
                            
                        <Text style={ styles.actionText}>Whatsapp</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={sendMail}
                        style={styles.action} >
                            
                        <Text style={ styles.actionText}>E-mail</Text> 
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    );
}