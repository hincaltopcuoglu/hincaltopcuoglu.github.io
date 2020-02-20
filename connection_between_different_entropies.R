library(plyr)

##' **prove that joint entropy of two variables X and Y is equal to conditional entropy + entropy of Y**\
##' **Prove : H(X;Y) = H(X|Y) + H(Y)**\
##'
##' **define shannon entropy**
shannon_entropy <- function(x){
  df = plyr::count(x)
  n = length(x)
  df$probs = df$freq / n
  se<- -sum(df$probs * log(df$probs,base=2))
  return(se)
}


##' **create distinct datasets**
data1<-round(rnorm(100, 15, 1), 0)
data2<-round(rnorm(100, 50, 1), 0)

df <- data.frame(data1,data2)
colnames(df)<-c("X","Y")
head(df)

##' **calculate entropy of Y variable**
entpy_Y<-shannon_entropy(df$Y)

entpy_Y


##' **calculate joint probability of our data**
prob_df <- prop.table(table(df))

##' **1-) calculate conditional probabilities**
cond<-data.frame()
for (i in colnames(prob_df)){
    for ( j in row.names(prob_df)){
      cond[j,i]<-prob_df[j,i] / sum(prob_df[,i])
    }
}

cond

##' **2-) calculate conditional entropy**
sx<-data.frame()
for (i in colnames(cond)){
  for ( j in row.names(cond)){
     sx[j,i]<- prob_df[j,i] * log(cond[j,i],base = 2)
      
  }
  
}

sx

conditional_entropy<- -sum(sx,na.rm = T)


##' **3-) Calculate joint entropy**
sx_prob<-data.frame()
for (i in colnames(prob_df)){
  for ( j in row.names(prob_df)){
    sx_prob[j,i]<- prob_df[j,i] * log(prob_df[j,i],base = 2)
    
  }
}

sx_prob

joint_entropy<- -sum(sx_prob,na.rm = T)

##' **check if joint probability is equal to conditional probability + entropy of Y**\
##' **H(X;Y) = H(X|Y) + H(Y)**\
conditional_entropy + entpy_Y
joint_entropy

##' **yes, thats it :)**

