import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Toast } from 'antd-mobile';
import { observable, computed, toJS, runInAction } from 'mobx'

export default function BeforeRoute(Component) {

    function getDisplayName(Component) {
        return Component.displayName || 
        Component.name || 
        'Component'
    }


    @inject("store")
    @observer
    class HockRoute extends React.Component {

        @observable roles = {
            // admin所有权限，manager经理，operator运营
            admin:[
                '/StockInventoryList',
                '/CreateStockInventory',
                '/EditStockInventory',
                '/DashboardMarketingManager',
                '/DashboardMarketing',
                '/StockInventoryInfoList',
                '/NewProductDetector',
                '/DataSpider',
                '/StoreDetail'
            ],
            manager:[
                '/StockInventoryList',
                '/CreateStockInventory',
                '/EditStockInventory',
                '/DashboardMarketingManager',
                '/DashboardMarketing',
                '/StockInventoryInfoList',
                '/StoreDetail'
            ],
            operator:[
                '/StockInventoryList',
                '/CreateStockInventory',
                '/EditStockInventory',
                '/DashboardMarketingManager',
                '/StockInventoryInfoList',
                '/StoreDetail'
            ]
        }

        componentWillMount () {
            const { store: { common } } = this.props
            const { history, location: { pathname } } = this.props

            if(!common.userInfo){
		        common.getUserInfo().then(() => this.load(this.props));
            }else{
                if (!common.userInfo.erp) {
                    Toast.fail('登录失效，请重新登录');
                }
            }
        }

        load(props) {
            const { store: { common } } = props

            if (!common.userInfo.erp) {
                Toast.fail('登录失效，请重新登录');
            }
        }

        render () {
            return React.createElement(
                Component,
                { ...this.props }
            )
        }

    }

    HockRoute.displayName = `HOC(${getDisplayName(Component)})`;
    return HockRoute
}

export async function checkUserInfo(props){
    const { store: { common } } = props

    if(!common.userInfo){
        await common.getUserInfo().then(() => load());
    }else{
        if (!common.userInfo.erp) {
            Toast.fail('登录失效，请重新登录');
        }
    }

    function load() {
        if (!common.userInfo.erp) {
            Toast.fail('登录失效，请重新登录');
        }
    }
}
