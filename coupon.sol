pragma solidity ^0.4.11;

contract coupon_system{
    struct User{
        address user_address;
        string user_name;
        string[1000] market;
        string[1000] coupon_name;
        uint[1000] coupon_num;
        uint count;
    }
    
    User[1000] user;
    uint user_size=0;
    
    struct Mart{
        address mart_address;
        string mart_name;
        string[1000] coupon; 
        uint coupon_num;
    }
    
    Mart[1000] mart;
    uint mart_size=0;
    
    function compareStrings (string a, string b) internal returns (bool){
       return keccak256(a) == keccak256(b);
    }
    function findUser(string name) public view  returns (int){
        for(uint i=0; i<user_size; i++){
            if(compareStrings(user[i].user_name, name)){
                return int(i);
            }
        }
        return -1;
    }
    function findMarket(string name) public view  returns (int){
        for(uint i=0; i<mart_size; i++){
            if(compareStrings(mart[i].mart_name, name)){
                return int(i);
            }
        }
        return -1;
    }
    
    
    
    function strConcat(string _a, string _b, string _c, string _d, string _e) internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    function strConcat(string _a, string _b, string _c, string _d) internal returns (string) {
        return strConcat(_a, _b, _c, _d, "");
    }

    function strConcat(string _a, string _b, string _c) internal returns (string) {
        return strConcat(_a, _b, _c, "", "");
    }

    function strConcat(string _a, string _b) internal returns (string) {
        return strConcat(_a, _b, "", "", "");
    }
    function uint2str(uint i) internal pure returns (string){
        if (i == 0) return "0";
        uint j = i;
        uint length;
        while (j != 0){
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint k = length - 1;
        while (i != 0){
            bstr[k--] = byte(48 + i % 10);
            i /= 10;
        }
        return string(bstr);
    }
    
    //--------
    
    
    function registerUser(string name) public returns (bool){
        for(uint i=0; i<user_size; i++){
            if(compareStrings(user[i].user_name, name)){
                return false;
            }
        }
        
        user[user_size].user_address = msg.sender;
        user[user_size].user_name = name;
        user[user_size].count = 0;
        user_size++;
        return true;
    }
    
    function useCoupon(string user_name, string market_name, string coupon_name) public returns (bool){
        int find_idx = findUser(user_name);
        if(find_idx<0){
            return false;
        }
        uint user_idx = uint(find_idx);
        
        // check sender address
        /*if(user[user_idx].user_address !=msg.sender){
            return false;
        }*/
        
        uint idx=1001;
        int coupon_count = 0;
        for(uint i=0; i<user[user_idx].count; i++){
            if(compareStrings(market_name, user[user_idx].market[i])){
                if(compareStrings(coupon_name, user[user_idx].coupon_name[i])){
                    idx = i;
                    coupon_count = int(user[user_idx].coupon_num[i]); 
                }
            }
        }
        if(coupon_count>0){
            user[user_idx].coupon_num[idx]--;
            return true;
        }
        else{
            return false;
        }
    }
    
    function showUserCoupon(string user_name) public view returns (string){
        string memory re = "";
                
        for(uint i=0; i<user_size; i++){
            if(compareStrings(user[i].user_name, user_name)){
                for(uint j=0; j<user[i].count; j++){
                    re = strConcat(re ,user[i].market[j], ",");
                    re = strConcat(re , user[i].coupon_name[j], ",");
                    re = strConcat(re , uint2str(user[i].coupon_num[j]), "\n");
                }
            }
        }
        return re;
    }
    
    function registerMarket(string market_name) public returns (bool){
        for(uint i=0; i<mart_size; i++){
            if(compareStrings(mart[i].mart_name, market_name)){
                return false;
            }
        }
        
        mart[mart_size].mart_address =msg.sender;
        mart[mart_size].mart_name = market_name;
        mart[mart_size].coupon_num = 0;
        mart_size++;
        return true;
    }
    
    function makeCoupon(string market_name, string coupon_name) public returns (bool){
        int idx0 = -1;
        for(uint i=0; i<mart_size; i++){
            if(compareStrings(mart[i].mart_name, market_name)){
                idx0 = int(i);
            }
        }
        if(idx0<0){
            return false;
        }
        
        uint idx = uint(idx0);
        
        mart[idx].coupon[mart[idx].coupon_num] = coupon_name;
        mart[idx].coupon_num++;
        return true;
    }
    
    // market to user
    function giveMarketCoupon(string market_name, string user_name, uint coupon_count, string coupon_name) public returns (bool){
        int m_idx0 = -1;
        int c_idx0 = -1;
        int u_idx0 = -1;
        for(uint i=0; i<mart_size; i++){
            if(compareStrings(mart[i].mart_name, market_name)){
                m_idx0 = int(i);
                for(uint j=0; j<mart[i].coupon_num; j++){
                    if(compareStrings(coupon_name, mart[i].coupon[j])){
                        c_idx0 = int(j);
                    }
                }
            }
        }
        
        for( i=0; i<user_size; i++){
            if(compareStrings(user[i].user_name, user_name)){
                u_idx0 = int(i);
            }
        }
        
        if(m_idx0<0 || c_idx0<0 || u_idx0 <0){
            return false;
        }
        uint m_idx = uint(m_idx0);
        uint u_idx = uint(u_idx0);
        
        int is_in=-1;
        for( i=0; i<user[u_idx].count; i++){
            if(compareStrings(user[u_idx].coupon_name[i], coupon_name) &&compareStrings(user[u_idx].market[i], market_name) ){
                user[u_idx].coupon_num[i]+= coupon_count;
                is_in = 1;
            }
        }
        
        if(is_in<0){
            user[u_idx].market[user[u_idx].count] = mart[m_idx].mart_name;
            user[u_idx].coupon_name[user[u_idx].count] = coupon_name;
            user[u_idx].coupon_num[user[u_idx].count] = coupon_count;
            user[u_idx].count++;
        }
        
        return true;
    }
    
    // user to user
    function giveUserCoupon(string give_user_name, string receive_user_name, uint coupon_count, string coupon_name, string mart_name) public returns (bool){
        int gu_idx0 = -1;
        int c_idx0 = -1;
        int ru_idx0 = -1;
        
        for(uint i=0; i<user_size; i++){
            if(compareStrings(user[i].user_name, give_user_name)){
                gu_idx0 = int(i);
                for(uint j=0; j<user[i].count; j++){
                    if(compareStrings(user[i].coupon_name[j], coupon_name) && compareStrings(user[i].market[j], mart_name)){
                        c_idx0 = int(j);
                        if(coupon_count <= user[i].coupon_num[j]){
                            user[i].coupon_num[j] -= coupon_count;
                        }
                        else{
                            c_idx0 = -1;
                        }
                        break;
                    }
                }
            }
        }
        
        for( i=0; i<user_size; i++){
            if(compareStrings(user[i].user_name, receive_user_name)){
                ru_idx0 = int(i);
            }
        }
        
        if(gu_idx0<0 || c_idx0<0 || ru_idx0 <0){
            return false;
        }
        
        int is_in=-1;
        for( i=0; i<user[uint(ru_idx0)].count; i++){
            if(compareStrings(user[uint(ru_idx0)].coupon_name[i], coupon_name) && compareStrings(user[uint(ru_idx0)].market[i], mart_name)){
                user[uint(ru_idx0)].coupon_num[i]+= coupon_count;
                is_in = 1;
            }
        }
        
        if(is_in<0){
            user[uint(ru_idx0)].market[user[uint(ru_idx0)].count] = mart_name;
            user[uint(ru_idx0)].coupon_name[user[uint(ru_idx0)].count] = coupon_name;
            user[uint(ru_idx0)].coupon_num[user[uint(ru_idx0)].count] = coupon_count;
            user[uint(ru_idx0)].count++;
        }
        
        return true;
    }
    
    // show all user
    function showUser() public view returns (string){
        string memory re = "";
                
        for(uint i=0; i<user_size; i++){
            re = strConcat(re ,user[i].user_name, "\n");
        }
        return re;
    }
    // show all market
    function showMarket() public view returns (string){
        string memory re = "";
                
        for(uint i=0; i<mart_size; i++){
            re = strConcat(re , mart[i].mart_name, "\n");
        }
        return re;
    }
    // show coupons of market
    function showMarketCoupon(string mart_name) public view returns (string){
        string memory re = "";
                
        for(uint i=0; i<mart_size; i++){
            if(compareStrings(mart[i].mart_name, mart_name)){
                for(uint j=0; j<mart[i].coupon_num; j++){
                    re = strConcat(re , mart[i].coupon[j], "\n");
                }
            }
        }
        return re;
    }
    
   
}