/*
 * @Author: Luo Wei
 * @Date: 2022-03-19 09:54:22
 * @LastEditors: Luo Wei
 * @LastEditTime: 2022-04-08 18:27:48
 */

import Taro from '@tarojs/taro';
import { View, Picker, Text } from '@tarojs/components';
import { useEffect, useState } from 'react';
import {
  AtCalendar,
  AtButton,
  AtActionSheet,
  AtActionSheetItem,
  AtInput,
  AtList,
  AtListItem,
  AtMessage
} from 'taro-ui';

import 'taro-ui/dist/style/components/calendar.scss'; // 按需引入
import 'taro-ui/dist/style/components/card.scss';
import 'taro-ui/dist/style/components/button.scss';
import 'taro-ui/dist/style/components/loading.scss';
import 'taro-ui/dist/style/components/action-sheet.scss';
import 'taro-ui/dist/style/components/input.scss';
import 'taro-ui/dist/style/components/icon.scss';
import 'taro-ui/dist/style/components/list.scss';
import 'taro-ui/dist/style/components/message.scss';

import { todoList } from '../../api/index';

import './index.less';

const List = () => {
  const baseCurrentNode = {
    _id: null,
    title: '',
    date: '',
    time: ''
  };

  const [myList, setMyList] = useState(() => []);
  const [isOpened, setIsOpened] = useState(() => false);
  const [type, setType] = useState(() => null);
  const [currentNode, setCurrentNode] = useState(() => baseCurrentNode);

  const getMyList = async () => {
    try {
      const {
        data: {
          data: { list }
        }
      } = await todoList.getTodoList();
      setMyList(list);
    } catch (err) {
      console.error(err);
    }
  };

  const addMyList = async () => {
    const { title, date, time, _id } = currentNode;
    if (title === '' && date === '' && time === '' && _id === null) {
      Taro.atMessage({ message: '请正确填入信息', type: 'warning' });
      return false;
    }
    try {
      await todoList.addTodoList(currentNode);
      setIsOpened(() => false);
      getMyList();
      Taro.atMessage({ message: '添加成功', type: 'success' });
    } catch (err) {
      console.error(err);
    }
  };

  const alterMyList = async () => {
    const { title, date, time, _id } = currentNode;
    if (title === '' && date === '' && time === '' && _id === null) {
      Taro.atMessage({ message: '请正确填入信息', type: 'warning' });
      return false;
    }
    try {
      await todoList.alterTodoList(currentNode);
      setIsOpened(() => false);
      getMyList();
      Taro.atMessage({ message: '修改成功', type: 'success' });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMyList = async () => {
    try {
      const { _id } = currentNode;
      await todoList.deleteTodoList({ _id });
      setIsOpened(() => false);
      getMyList();
      Taro.atMessage({ message: '删除成功', type: 'success' });
    } catch (err) {
      console.error(err);
    }
  };

  const finishMyList = async () => {
    try {
      const { _id } = currentNode;
      await todoList.finishTodoList({ _id });
      setIsOpened(() => false);
      getMyList();
      Taro.atMessage({ message: '已完成代办', type: 'success' });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMyList();
  }, []);

  return (
    <View className='at-row main-container'>
      <AtMessage />
      <View className='at-col calendar'>
        <AtCalendar />
      </View>
      <View className='at-col todo-list'>
        <AtButton
          className='add-button'
          onClick={() => {
            setType(() => '新建代办');
            setIsOpened(() => true);
            setCurrentNode(baseCurrentNode);
          }}
          type='secondary'
          circle
        >
          +
        </AtButton>
        {myList.map(item => (
          <View
            onClick={() => {
              setType(() => '修改代办');
              setIsOpened(() => true);
              setCurrentNode(item);
            }}
            className='todo-item .animate__animated animate__fadeInUp'
            key={item._id}
          >
            <Text className='todo-title'>{item.title}</Text>
            <Text className='todo-time'>
              {item.date} {item.time}
            </Text>
          </View>
        ))}
      </View>
      <AtActionSheet
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(() => false);
        }}
        title={`${type}`}
      >
        <AtActionSheetItem>
          <AtInput
            name='事件标题:'
            title='事件标题:'
            type='text'
            className='text-right'
            value={currentNode.title}
            onChange={title => {
              setCurrentNode(state => ({ ...state, title }));
            }}
          />
          <Picker
            mode='date'
            className='picker'
            onChange={e => {
              setCurrentNode(state => ({ ...state, date: e.detail.value }));
            }}
          >
            <AtList>
              <AtListItem title='请选择日期' extraText={currentNode.date} />
            </AtList>
          </Picker>
          <Picker
            mode='time'
            className='picker'
            onChange={e => {
              setCurrentNode(state => ({ ...state, time: e.detail.value }));
            }}
          >
            <AtList>
              <AtListItem title='请选择时间' extraText={currentNode.time} />
            </AtList>
          </Picker>
        </AtActionSheetItem>
        <AtActionSheetItem>
          {type === '新建代办' ? (
            <AtButton onClick={addMyList} type='secondary'>
              新建代办
            </AtButton>
          ) : (
            <>
              <AtButton
                onClick={finishMyList}
                type='secondary'
                className='edit-button'
              >
                完成
              </AtButton>
              <AtButton
                onClick={alterMyList}
                type='secondary'
                className='edit-button'
              >
                修改代办
              </AtButton>
              <AtButton
                onClick={deleteMyList}
                type='secondary'
                className='edit-button'
              >
                删除代办
              </AtButton>
            </>
          )}
        </AtActionSheetItem>
      </AtActionSheet>
    </View>
  );
};

export default List;
