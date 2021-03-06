import React, { useState, useEffect } from 'react'; //useEffect: carregar informações assim que o component é exibido em tela
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import logoImg from '../../assets/logo.png';

import api from '../../services/api';

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); //listagem de casos iniciando da página 1
    const [loading, setLoading] = useState(false); //armazenar a informação na busca de novos dados para evitar que esses dados sejam carregados novamente, carregando uma página por vez

    function navigateToDetails(incident) {
        navigation.navigate('Details', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return; //para evitar que enquanto outra requisição estiver sendo feita, que mais uma requisição aconteça
        }

        if (total > 0 && incidents.length === total) {
            return; //para caso tenha carregado todos os casos, não ter necessidade de carregar novamente
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page } //atualiza a paginação (?page=2)
        });

        setIncidents([...incidents, ...response.data]); //os dados são exibidos assim para que, em vez de ocorrer a troca de página, ocorra a rolagem infinita
        setTotal(response.headers['x-total-count']); //header criada no backend para contabilizar o total de caso
        setPage(page + 1); //ocorre a paginação
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} caso(s)</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo(a)!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={ incident => String(incident.id) }
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2} //se ele estiver a 20% do final da lista, mais itens são carregados
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', 
                                currency: 'BRL' 
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateToDetails(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}