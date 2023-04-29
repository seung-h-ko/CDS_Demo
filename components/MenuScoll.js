import { View, Text, Image, ScrollView, Modal, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectMenuMenus, selectMenuMenusByCategory } from '../features/menuSlice'
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import MenuDetail from './MenuDetail';

export default function MenuScoll({ category }) {
    const menus = useSelector(state => selectMenuMenusByCategory(state, category));
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState({});


    return (
        <>
            <ScrollView
                contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: 'wrap',
                }}
            >
                {
                    menus.map((menu) => (
                        <Pressable
                            onPress={() => { setModalVisible(true); setSelectedMenu(menu) }}
                            key={menu._id}
                            className="w-1/2 h-52">
                            <View className="flex-1 p-2 m-2 justify-center items-center rounded-3xl border border-gray-200">
                                <Image
                                    source={{
                                        uri: 'https://picsum.photos/id/292/200/300'
                                    }}

                                    className="flex-1 w-2/3 rounded-full"
                                />
                                <Text className="font-bold text-lg">{menu.name}</Text>
                                <Text>${menu.price}</Text>
                            </View>
                        </Pressable>
                    ))
                }
            </ScrollView>
            <Modal
                animationType='fade'
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View className="relative h-full justify-center items-center">
                    <Pressable
                        className="absolute h-full w-full bg-black/50"
                        onPress={() => { setModalVisible(false) }}
                    >
                    </Pressable>
                    <MenuDetail selectedMenu={selectedMenu} setModalVisible={setModalVisible} />
                </View>
            </Modal>
        </>
    )
}