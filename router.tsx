import * as React from 'react';
// import React from 'react';

import { CommonActions, NavigationContainer, NavigationProp, useLinkTo, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, TouchableOpacity, View } from 'react-native';
import {geral, imgs} from './styles'
//Import pages
import HomeScreen from './pages/home/home';
import CarrinhoScreen from './pages/home/carrinho';

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen 
                name="Produtos" 
                component={HomeScreen} 
                initialParams={{carrinhoQtd: 0}}
              />
              <Stack.Screen 
                        name="Carrinho" 
                        component={CarrinhoScreen} 
                        initialParams={{carrinhoQtd: 0}}
                        options={{headerRight: () =>
                              <View>
                                  <Image source={imgs.iconCarrinho}  style={geral.iconMenu} />
                                    <View style={{backgroundColor: 'red', borderRadius: 80, height: 10, width:10, position: 'absolute', alignSelf:"flex-end"}} />
              </View>}} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}